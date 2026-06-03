<?php
/**
 * Headless PHP Worker — Document Processing & Auto-Verification
 *
 * Polls the database every 3 seconds for pending processing_jobs.
 * For each job: validates the file, runs OCR, generates a thumbnail,
 * matches keywords for auto-verification, and updates provider status.
 *
 * Run: php worker.php
 * Requires: DATABASE_URL environment variable
 */

declare(strict_types=1);

// Load Composer autoloader for TesseractOCR and other packages
$autoloadPaths = [
    __DIR__ . '/vendor/autoload.php',
    __DIR__ . '/../vendor/autoload.php',
];
foreach ($autoloadPaths as $path) {
    if (file_exists($path)) {
        require $path;
        break;
    }
}

// ===================================================================
// KEYWORD RULES — Per doc_type
// ===================================================================
// match_threshold: minimum positive keyword matches to pass
// positive: keywords that suggest a genuine document
// negative: keywords that suggest a fake/template document
// ===================================================================

const KEYWORD_RULES = [
    'id' => [
        'match_threshold' => 1,
        'positive' => [
            'identification',
            'identity',
            'identity number',
            'id number',
            'id card',
            'id document',
            'identity document',
            "driver's license",
            "driver's licence",
            'drivers license',
            'drivers licence',
            'driver license',
            'driver licence',
            'passport',
            'national id',
            'national identity',
            'national identification',
            'south african',
            'republic of south africa',
            'home affairs',
            'government',
            'official document',
            'surname',
            'given names',
            'date of birth',
            'country of birth',
            'id no',
            // Common driver's license fields (any country)
            'issue date',
            'expiration date',
            'expiry date',
            'date of issue',
            'date of expiry',
            'class',
            'endorsements',
            'restrictions',
            'donor',
            'organ donor',
            'sex',
            'height',
            'weight',
            'eyes',
            'hair',
            // Short field labels common on IDs
            'dl',
            'lic',
            'dob',
            'exp',
            'sex',
            'addr',
            'license no',
            'license number',
            'lic no',
        ],
        'negative' => [
            'sample',
            'example',
            'void',
            'template',
            'demo',
            'fake',
        ],
    ],
    'certification' => [
        'match_threshold' => 2,
        'positive' => [
            'certified',
            'certificate',
            'certification',
            'cert',
            'qualified',
            'qualification',
            'completed',
            'completion',
            'graduate',
            'graduated',
            'diploma',
            'degree',
            'mechanic',
            'technician',
            'automotive',
            'auto repair',
            'ase',
            'natef',
            'training',
            'course',
            'workshop',
            'accredited',
            'awarded',
            'successfully',
            'competent',
            'competency',
            // South African universities & institutions
            'witwatersrand',
            'university of pretoria',
            'university of johannesburg',
            'university of cape town',
            'university of the western cape',
            'university of kwazulu',
            'university of kwa-zulu',
            'university of limpopo',
            'stellenbosch',
            'north west university',
            'north-west university',
            'technical school of',
        ],
        'negative' => [
            'expired',
            'void',
            'sample',
            'template',
            'demo',
        ],
    ],
    'proof_of_residence' => [
        'match_threshold' => 1,
        'positive' => [
            'address',
            'resident',
            'residence',
            'municipal',
            'municipality',
            'statement',
            'utility',
            'bill',
            'property',
            'rental agreement',
            'lease',
            'rates and taxes',
        ],
        'negative' => [
            'sample',
            'void',
            'expired',
            'template',
        ],
    ],
];

// ===================================================================
// BOOTSTRAP
// ===================================================================

$dsn = getenv('DATABASE_URL');
if (!$dsn) {
    fwrite(STDERR, "FATAL: DATABASE_URL environment variable not set\n");
    exit(1);
}

// Support both explicit pgsql: DSN and postgresql:// URL formats
if (str_starts_with($dsn, 'pgsql:')) {
    $pdoDsn = $dsn;
} elseif (str_starts_with($dsn, 'postgresql://') || str_starts_with($dsn, 'postgres://')) {
    $parts = parse_url($dsn);
    $host   = $parts['host'] ?? 'localhost';
    $port   = $parts['port'] ?? 5432;
    $dbname = ltrim($parts['path'] ?? '', '/');
    $user   = $parts['user'] ?? 'postgres';
    $pass   = $parts['pass'] ?? '';

    $pdoDsn = sprintf('pgsql:host=%s;port=%d;dbname=%s', $host, $port, $dbname);
    $pdoUser = $user;
    $pdoPass = $pass;
} else {
    fwrite(STDERR, "FATAL: Unrecognised DATABASE_URL format: $dsn\n");
    exit(1);
}

$pdo = new PDO($pdoDsn, $pdoUser ?? null, $pdoPass ?? null, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

fwrite(STDOUT, "=== Document Processing Worker Started ===\n");

// =================================================================
// SCHEMA MIGRATION — ensure background-processing columns exist
// =================================================================
$migrateColumns = [
    'ocr_text TEXT',
    'thumbnail_url VARCHAR(500)',
    'doc_metadata JSONB DEFAULT \'{}\'',
    'validation_result JSONB DEFAULT \'{}\'',
];
foreach ($migrateColumns as $columnDef) {
    $colName = explode(' ', $columnDef)[0];
    try {
        $pdo->exec("ALTER TABLE mechanic_documents ADD COLUMN IF NOT EXISTS $columnDef");
    } catch (PDOException $e) {
        fwrite(STDERR, "[MIGRATE] Could not add column $colName: {$e->getMessage()}\n");
    }
}
fwrite(STDOUT, "[MIGRATE] Schema up to date\n");

// =================================================================
// STARTUP RECONCILIATION — catch up documents that were missed
// =================================================================
$reconciled = reconcilePendingDocuments($pdo);
if ($reconciled > 0) {
    fwrite(STDOUT, "[RECONCILE] Queued {$reconciled} previously unprocessed document(s)\n");
}

fwrite(STDOUT, "Polling every 3 seconds...\n");

while (true) {
    processNextJob($pdo);
    sleep(3);
}

// ===================================================================
// STARTUP RECONCILIATION
// ===================================================================
/**
 * On startup, find documents that were never queued or whose latest job
 * failed, and enqueue them so nothing gets stuck waiting for processing.
 */
function reconcilePendingDocuments(PDO $pdo): int
{
    // Documents with no processing_jobs entry at all
    $stmt = $pdo->query(
        "SELECT md.id
         FROM mechanic_documents md
         LEFT JOIN processing_jobs pj ON pj.document_id = md.id
         WHERE pj.id IS NULL"
    );
    $missing = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Documents whose latest job failed (retry them)
    $stmt = $pdo->query(
        "SELECT md.id
         FROM mechanic_documents md
         INNER JOIN LATERAL (
             SELECT status FROM processing_jobs
             WHERE document_id = md.id
             ORDER BY created_at DESC
             LIMIT 1
         ) latest ON true
         WHERE latest.status = 'failed'"
    );
    $failed = $stmt->fetchAll(PDO::FETCH_COLUMN);

    $docIds = array_unique(array_merge($missing, $failed));
    if (empty($docIds)) {
        return 0;
    }

    $queued = 0;
    $insert = $pdo->prepare(
        "INSERT INTO processing_jobs (document_id, job_type)
         VALUES (?, 'document_ocr')"
    );

    foreach ($docIds as $id) {
        try {
            $insert->execute([(int) $id]);
            if ($insert->rowCount() > 0) {
                $queued++;
            }
        } catch (PDOException $e) {
            fwrite(STDERR, "[RECONCILE] Failed to queue doc #{$id}: {$e->getMessage()}\n");
        }
    }

    return $queued;
}

// ===================================================================
// JOB FETCHING
// ===================================================================

function processNextJob(PDO $pdo): void
{
    // Fetch one pending job, skip-locked to avoid contention between workers
    $stmt = $pdo->prepare(
        "SELECT pj.id, pj.document_id, md.file_url, md.doc_type, md.mechanic_id
         FROM processing_jobs pj
         JOIN mechanic_documents md ON md.id = pj.document_id
         WHERE pj.status = 'pending'
         ORDER BY pj.created_at ASC
         LIMIT 1
         FOR UPDATE SKIP LOCKED"
    );
    $stmt->execute();
    $job = $stmt->fetch();

    if (!$job) {
        return; // nothing to do
    }

    processJob($pdo, $job);
}

// ===================================================================
// JOB PROCESSING
// ===================================================================

function processJob(PDO $pdo, array $job): void
{
    $jobId       = (int) $job['id'];
    $documentId  = (int) $job['document_id'];
    $fileUrl     = $job['file_url'];
    $docType     = $job['doc_type'];
    $providerId  = (int) $job['mechanic_id'];

    // Mark as processing
    $pdo->prepare("UPDATE processing_jobs SET status = 'processing' WHERE id = ?")
        ->execute([$jobId]);

    $filePath   = __DIR__ . $fileUrl;
    $ocrText    = '';
    $error      = null;
    $metadata   = [];
    $thumbUrl   = null;

    // If the file isn't local (separate-container deployment), download it
    if (!file_exists($filePath)) {
        $backendUrl = rtrim(getenv('BACKEND_URL') ?: 'http://localhost:3000', '/');
        $remoteUrl  = $backendUrl . $fileUrl;

        $remoteContent = @file_get_contents($remoteUrl);
        if ($remoteContent === false) {
            throw new RuntimeException(
                "File not found locally ($filePath) and failed to download from backend: $remoteUrl"
            );
        }

        $tempFile  = tempnam(sys_get_temp_dir(), 'doc_');
        file_put_contents($tempFile, $remoteContent);
        $filePath  = $tempFile;
    }

    try {
        // ----------------------------------------------------------
        // 1. Validate file exists
        // ----------------------------------------------------------
        if (!file_exists($filePath)) {
            throw new RuntimeException("File not found: $filePath");
        }

        // ----------------------------------------------------------
        // 2. Read image metadata via Imagick
        // ----------------------------------------------------------
        $imagick = new Imagick($filePath);
        $metadata = [
            'width'    => $imagick->getImageWidth(),
            'height'   => $imagick->getImageHeight(),
            'format'   => $imagick->getImageFormat(),
            'pages'    => $imagick->getNumberImages(),
            'fileSize' => filesize($filePath),
        ];

        // ----------------------------------------------------------
        // 3. Generate thumbnail
        // ----------------------------------------------------------
        $thumbDir  = dirname($filePath) . '/thumbs';
        if (!is_dir($thumbDir)) {
            mkdir($thumbDir, 0755, true);
        }
        $thumbPath = $thumbDir . '/' . pathinfo($filePath, PATHINFO_FILENAME) . '_thumb.jpg';
        $imagick->thumbnailImage(300, 0); // 300px wide, maintain aspect ratio
        $imagick->setImageFormat('jpg');
        $imagick->writeImage($thumbPath);
        $imagick->clear();
        $thumbUrl = dirname($fileUrl) . '/thumbs/' . basename($thumbPath);

        // ----------------------------------------------------------
        // 3b. Image preprocessing for better OCR
        // ----------------------------------------------------------
        $ocrImagePath = $filePath;
        if (class_exists('Imagick')) {
            try {
                $preprocess = new Imagick($filePath);
                $geo = $preprocess->getImageGeometry();
                $longest = max($geo['width'], $geo['height']);

                // Upscale small images (under 1500px) to improve OCR
                if ($longest < 1500) {
                    $scale = 1500 / $longest;
                    $preprocess->resizeImage(
                        (int) ($geo['width'] * $scale),
                        (int) ($geo['height'] * $scale),
                        Imagick::FILTER_LANCZOS, 1
                    );
                }

                // Grayscale + contrast for cleaner text
                $preprocess->setImageType(Imagick::IMGTYPE_GRAYSCALE);
                $preprocess->contrastImage(true); // enhance contrast

                // Save preprocessed temp file for OCR
                $ocrImagePath = tempnam(sys_get_temp_dir(), 'ocr_') . '.png';
                $preprocess->setImageFormat('png');
                $preprocess->writeImage($ocrImagePath);
                $preprocess->clear();

                fwrite(STDOUT, "[OCR] Preprocessed image: {$longest}px -> "
                    . max($preprocess->getImageGeometry()['width'], $preprocess->getImageGeometry()['height'])
                    . "px\n");
            } catch (Throwable $e) {
                fwrite(STDERR, "[OCR] Preprocessing skipped: {$e->getMessage()}\n");
                $ocrImagePath = $filePath;
            }
        }

        // ----------------------------------------------------------
        // 4. OCR with Tesseract (using preprocessed image)
        // ----------------------------------------------------------
        // Log file info before OCR
        fwrite(STDOUT, "[OCR] doc #{$documentId} — file={$filePath} size=" . filesize($filePath) . "\n");

        // First, try the PHP package
        $tesseractAvailable = class_exists('thiagoalessio\\TesseractOCR\\TesseractOCR');
        fwrite(STDOUT, "[OCR] TesseractOCR class " . ($tesseractAvailable ? "found" : "NOT FOUND") . "\n");

        if ($tesseractAvailable) {
            try {
                $tesseract = new thiagoalessio\TesseractOCR\TesseractOCR($ocrImagePath);
                $ocrText   = trim($tesseract->lang('eng')->run());
                fwrite(STDOUT, "[OCR] Package returned " . strlen($ocrText) . " chars\n");
            } catch (Throwable $e) {
                fwrite(STDERR, "[OCR] Package threw: {$e->getMessage()}\n");
            }
        }

        // If package returned nothing, try direct tesseract via shell
        if (empty($ocrText)) {
            $tesseractBin = trim(shell_exec('which tesseract 2>/dev/null') ?: '');
            $tesseractVer = trim(shell_exec('tesseract --version 2>&1 | head -1') ?: 'unknown');
            fwrite(STDOUT, "[OCR] Direct binary: " . ($tesseractBin ?: "NOT FOUND") . " (v{$tesseractVer})\n");

            if ($tesseractBin) {
                $escapedPath = escapeshellarg($ocrImagePath);
                $cmd = "tesseract {$escapedPath} stdout -l eng 2>&1";
                $directOcr = trim(shell_exec($cmd) ?: '');
                if (!empty($directOcr)) {
                    $ocrText = $directOcr;
                    fwrite(STDOUT, "[OCR] Direct binary returned " . strlen($ocrText) . " chars\n");
                } else {
                    fwrite(STDERR, "[OCR] Direct binary returned empty — trying with --psm 6\n");
                    $cmd = "tesseract {$escapedPath} stdout -l eng --psm 6 2>&1";
                    $directOcr = trim(shell_exec($cmd) ?: '');
                    if (!empty($directOcr)) {
                        $ocrText = $directOcr;
                        fwrite(STDOUT, "[OCR] Direct binary (psm 6) returned " . strlen($ocrText) . " chars\n");
                    } else {
                        fwrite(STDERR, "[OCR] All Tesseract attempts returned empty text\n");
                    }
                }
            }
        }

        // Log OCR preview to help debug keyword matching
        $preview = mb_substr($ocrText, 0, 300);
        fwrite(STDOUT, "[OCR] doc #{$documentId} ({$docType}) — "
            . (strlen($ocrText) > 0
                ? strlen($ocrText) . " chars: " . str_replace("\n", "\\n", $preview)
                : "NO TEXT EXTRACTED")
            . "\n");

        // ----------------------------------------------------------
        // 5. Keyword matching & auto-verification
        // ----------------------------------------------------------
        $validationResult = matchKeywords($ocrText, $docType);

        // ----------------------------------------------------------
        // 6. Update mechanic_documents with all results
        // ----------------------------------------------------------
        $stmt = $pdo->prepare(
            "UPDATE mechanic_documents
             SET ocr_text = ?, thumbnail_url = ?, doc_metadata = ?, validation_result = ?
             WHERE id = ?"
        );
        $stmt->execute([
            $ocrText,
            $thumbUrl,
            json_encode($metadata),
            json_encode($validationResult),
            $documentId,
        ]);

        // ----------------------------------------------------------
        // 7. If auto-verified, check if provider now qualifies
        // ----------------------------------------------------------
        if ($validationResult['auto_verified'] === true) {
            checkProviderQualification($pdo, $providerId);
        }

        // ----------------------------------------------------------
        // 8. Mark job complete
        // ----------------------------------------------------------
        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'completed', processed_at = NOW() WHERE id = ?"
        )->execute([$jobId]);

        fwrite(STDOUT, "[OK] Job #{$jobId} — doc #{$documentId} ({$docType}) "
            . "status={$validationResult['status']} score={$validationResult['score']}\n");

    } catch (Throwable $e) {
        $error = $e->getMessage();

        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'failed', error_message = ?, processed_at = NOW() WHERE id = ?"
        )->execute([$error, $jobId]);

        fwrite(STDERR, "[FAIL] Job #{$jobId} — doc #{$documentId}: {$error}\n");
    }
}

// ===================================================================
// KEYWORD MATCHING
// ===================================================================

/**
 * Run OCR text against keyword rules for the given doc_type.
 *
 * Returns: [
 *   'auto_verified'    => bool,
 *   'status'           => 'auto_verified' | 'needs_review' | 'suspicious',
 *   'score'            => int (positive keyword matches),
 *   'matched_keywords' => string[],
 *   'negative_hits'    => string[],
 *   'rules_applied'    => string (doc_type),
 * ]
 */
function matchKeywords(string $ocrText, string $docType): array
{
    $result = [
        'auto_verified'    => false,
        'status'           => 'needs_review',
        'score'            => 0,
        'matched_keywords' => [],
        'negative_hits'    => [],
        'rules_applied'    => $docType,
    ];

    // Unknown doc_type — flag for manual review
    if (!isset(KEYWORD_RULES[$docType])) {
        $result['status'] = 'needs_review';
        return $result;
    }

    $rules = KEYWORD_RULES[$docType];

    // Empty OCR text — nothing to match
    if (empty($ocrText)) {
        $result['status'] = 'needs_review';
        return $result;
    }

    $lowerText = mb_strtolower($ocrText);

    // Normalize whitespace: collapse all whitespace sequences to single space
    // so multi-word keywords match even when OCR inserts line breaks
    $normalized = preg_replace('/\s+/', ' ', $lowerText);

    // Score positive keywords
    foreach ($rules['positive'] as $keyword) {
        $lowerKeyword = mb_strtolower($keyword);
        if (mb_strpos($normalized, $lowerKeyword) !== false) {
            $result['score']++;
            $result['matched_keywords'][] = $keyword;
        }
    }

    // Check negative keywords (also use normalized text)
    foreach ($rules['negative'] as $keyword) {
        $lowerKeyword = mb_strtolower($keyword);
        if (mb_strpos($normalized, $lowerKeyword) !== false) {
            $result['negative_hits'][] = $keyword;
        }
    }

    // Decision matrix
    $passedThreshold = $result['score'] >= $rules['match_threshold'];
    $hasNegatives    = count($result['negative_hits']) > 0;

    if ($passedThreshold && !$hasNegatives) {
        // Clean match — auto-verify
        $result['auto_verified'] = true;
        $result['status']        = 'auto_verified';
    } elseif ($passedThreshold && $hasNegatives) {
        // Matched keywords but also hit negatives — admin decides
        $result['auto_verified'] = false;
        $result['status']        = 'needs_review';
    } elseif (!$passedThreshold && $hasNegatives) {
        // Hit negatives but no solid keywords — suspicious
        $result['auto_verified'] = false;
        $result['status']        = 'suspicious';
    } else {
        // No keywords matched, no negatives — couldn't verify
        $result['auto_verified'] = false;
        $result['status']        = 'needs_review';
    }

    return $result;
}

// ===================================================================
// PROVIDER QUALIFICATION CHECK
// ===================================================================

/**
 * Check if provider has all 3 required document types auto-verified.
 * If so, upgrade their verification_status to 'verified'.
 */
function checkProviderQualification(PDO $pdo, int $providerId): void
{
    $stmt = $pdo->prepare(
        "SELECT COUNT(DISTINCT doc_type) AS verified_types
         FROM mechanic_documents
         WHERE mechanic_id = ?
           AND validation_result->>'auto_verified' = 'true'
           AND doc_type IN ('id', 'certification', 'proof_of_residence')"
    );
    $stmt->execute([$providerId]);
    $row = $stmt->fetch();

    $requiredTypes = 3; // id + certification + proof_of_residence

    if ((int) $row['verified_types'] >= $requiredTypes) {
        $pdo->prepare(
            "UPDATE service_provider_profiles
             SET verification_status = 'verified',
                 updated_at = NOW()
             WHERE account_id = ? AND verification_status != 'verified'"
        )->execute([$providerId]);

        fwrite(STDOUT, "[★] Provider (account #{$providerId}) is now VERIFIED "
            . "(all {$requiredTypes} doc types auto-approved)\n");
    }
}
