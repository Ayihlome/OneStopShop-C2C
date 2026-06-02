<?php
/**
 * Headless PHP Worker — Document Processing
 *
 * Polls the database every 3 seconds for pending processing_jobs.
 * For each job: validates the file, runs OCR, generates a thumbnail,
 * and updates the mechanic_documents record.
 *
 * Run: php worker.php
 * Requires: DATABASE_URL environment variable
 */

declare(strict_types=1);

$dsn = getenv('DATABASE_URL');
if (!$dsn) {
    fwrite(STDERR, "FATAL: DATABASE_URL environment variable not set\n");
    exit(1);
}

$pdo = new PDO($dsn, null, null, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

fwrite(STDOUT, "Worker started. Polling every 3s...\n");

while (true) {
    processNextJob($pdo);
    sleep(3);
}

function processNextJob(PDO $pdo): void
{
    // Fetch one pending job, skip-locked to avoid contention between workers
    $stmt = $pdo->prepare(
        "SELECT pj.id, pj.document_id, md.file_url
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

function processJob(PDO $pdo, array $job): void
{
    $jobId       = (int) $job['id'];
    $documentId  = (int) $job['document_id'];
    $fileUrl     = $job['file_url'];

    // Mark as processing
    $pdo->prepare("UPDATE processing_jobs SET status = 'processing' WHERE id = ?")
        ->execute([$jobId]);

    $filePath  = __DIR__ . $fileUrl;
    $ocrText   = '';
    $error     = null;
    $metadata  = [];
    $thumbUrl  = null;

    try {
        // 1. Validate file exists
        if (!file_exists($filePath)) {
            throw new RuntimeException("File not found: $filePath");
        }

        // 2. Read image metadata via Imagick
        $imagick = new Imagick($filePath);
        $metadata = [
            'width'  => $imagick->getImageWidth(),
            'height' => $imagick->getImageHeight(),
            'format' => $imagick->getImageFormat(),
            'pages'  => $imagick->getNumberImages(),
        ];

        // 3. Generate thumbnail
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

        // 4. OCR with Tesseract
        if (class_exists('thiagoalessio\TesseractOCR\TesseractOCR')) {
            $tesseract = new thiagoalessio\TesseractOCR\TesseractOCR($filePath);
            $ocrText   = trim($tesseract->lang('eng')->run());
        }

        // 5. Update document record
        $stmt = $pdo->prepare(
            "UPDATE mechanic_documents
             SET ocr_text = ?, thumbnail_url = ?, doc_metadata = ?
             WHERE id = ?"
        );
        $stmt->execute([$ocrText, $thumbUrl, json_encode($metadata), $documentId]);

        // 6. Mark job complete
        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'completed', processed_at = NOW() WHERE id = ?"
        )->execute([$jobId]);

        fwrite(STDOUT, "[OK] Job #{$jobId} — document #{$documentId} processed\n");

    } catch (Throwable $e) {
        $error = $e->getMessage();

        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'failed', error_message = ?, processed_at = NOW() WHERE id = ?"
        )->execute([$error, $jobId]);

        fwrite(STDERR, "[FAIL] Job #{$jobId} — document #{$documentId}: {$error}\n");
    }
}
