# Phase 4 — PHP Background Document Processing Worker

> Branch: `phase-4/php-document-worker` from `master`

## Overview

Add a **headless PHP worker** that processes uploaded documents (OCR, validation, thumbnails) in the background. Express handles the upload and responds fast (<100ms); PHP picks up pending jobs, processes them, and updates the database.

---

## Architecture

```
User upload ──→ Express (multer) ──→ save file ──→ INSERT processing_jobs ──→ 201 ✅
                                                    │
                                                    ▼
                              PHP Worker (loop every 3s)
                              ─→ SELECT pending jobs
                              ─→ Open file, OCR, validate, thumbnail
                              ─→ UPDATE mechanic_documents SET ocr_text=..., status='processed'
```

---

## Workstreams

### 4.1 — Database: Add `processing_jobs` table + migration

**Objective:** Queue for background document processing jobs.

**Files:**
- Create: `backend/db/migrations/004_processing_jobs.sql`

**Schema:**
```sql
CREATE TABLE IF NOT EXISTS processing_jobs (
  id SERIAL PRIMARY KEY,
  document_id INT NOT NULL REFERENCES mechanic_documents(id) ON DELETE CASCADE,
  job_type VARCHAR(50) NOT NULL DEFAULT 'document_ocr',
  status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_processing_jobs_pending
  ON processing_jobs (status, created_at)
  WHERE status = 'pending';
```

Also extend `mechanic_documents` with OCR result columns:
```sql
ALTER TABLE mechanic_documents
  ADD COLUMN IF NOT EXISTS ocr_text TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS doc_metadata JSONB DEFAULT '{}';
```

**Migration file:** `backend/db/migrations/004_processing_jobs.sql`

---

### 4.2 — Express: Queue job on document upload

**Objective:** After multer saves the file and inserts the `mechanic_documents` row, also INSERT a `processing_jobs` row.

**Files:**
- Modify: `backend/services/mechanicService.js` — in `uploadDocument()`, add INSERT into `processing_jobs`
- Modify: `backend/controllers/mechanicController.js` — pass back `job_id` in response

**Changes to `mechanicService.uploadDocument()`:**
```javascript
// After the mechanic_documents INSERT, also queue processing job
const job = await pool.query(
  `INSERT INTO processing_jobs (document_id, job_type)
   VALUES ($1, 'document_ocr')
   RETURNING *`,
  [result.rows[0].id]
);
```

---

### 4.3 — PHP Worker: OCR + Validation + Thumbnails

**Objective:** Headless PHP script that polls for pending jobs and processes them.

**Files:**
- Create: `php-auth/Dockerfile.php-worker`
- Create: `php-auth/worker.php`
- Create: `php-auth/composer.json`

**`php-auth/composer.json`:**
```json
{
  "require": {
    "thiagoalessio/tesseract_ocr": "^2.12"
  }
}
```

**`php-auth/Dockerfile.php-worker`:**
```dockerfile
FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libmagickwand-dev \
    tesseract-ocr \
    tesseract-ocr-eng \
    poppler-utils \
    --no-install-recommends && \
    pecl install imagick && \
    docker-php-ext-enable imagick && \
    docker-php-ext-install mbstring pdo_pgsql exif && \
    apt-get clean

WORKDIR /app

COPY composer.json .
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --no-interaction

COPY worker.php .

CMD ["php", "worker.php"]
```

**`php-auth/worker.php` (core logic):**
```php
<?php
// Headless worker — polls DB every 3s for pending jobs

$dsn = getenv('DATABASE_URL');
if (!$dsn) { fwrite(STDERR, "DATABASE_URL not set\n"); exit(1); }

$pdo = new PDO($dsn, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

while (true) {
    $job = $pdo->query(
        "SELECT pj.id, pj.document_id, md.file_url
         FROM processing_jobs pj
         JOIN mechanic_documents md ON md.id = pj.document_id
         WHERE pj.status = 'pending'
         ORDER BY pj.created_at ASC
         LIMIT 1 FOR UPDATE SKIP LOCKED"
    )->fetch(PDO::FETCH_ASSOC);

    if ($job) {
        processJob($pdo, $job);
    }

    sleep(3);
}

function processJob(PDO $pdo, array $job): void {
    $pdo->prepare("UPDATE processing_jobs SET status = 'processing' WHERE id = ?")
        ->execute([$job['id']]);

    $filePath = __DIR__ . $job['file_url'];
    $ocrText = '';
    $thumbnailUrl = null;
    $metadata = [];
    $error = null;

    try {
        // 1. Validate file exists
        if (!file_exists($filePath)) {
            throw new RuntimeException("File not found: $filePath");
        }

        // 2. Get image metadata via Imagick
        $imagick = new Imagick($filePath);
        $metadata = [
            'width'  => $imagick->getImageWidth(),
            'height' => $imagick->getImageHeight(),
            'format' => $imagick->getImageFormat(),
            'pages'  => $imagick->getNumberImages(),
        ];

        // 3. Generate thumbnail
        $thumbDir = dirname($filePath) . '/thumbs';
        if (!is_dir($thumbDir)) mkdir($thumbDir, 0755, true);
        $thumbPath = $thumbDir . '/' . pathinfo($filePath, PATHINFO_FILENAME) . '_thumb.jpg';
        $imagick->thumbnailImage(300, 0);
        $imagick->setImageFormat('jpg');
        $imagick->writeImage($thumbPath);
        $thumbnailUrl = dirname($job['file_url']) . '/thumbs/' . basename($thumbPath);

        // 4. OCR with Tesseract
        $tesseract = new thiagoalessio\TesseractOCR\TesseractOCR($filePath);
        $ocrText = trim($tesseract->lang('eng')->run());

        // 5. Update document record
        $stmt = $pdo->prepare(
            "UPDATE mechanic_documents
             SET ocr_text = ?, thumbnail_url = ?, doc_metadata = ?
             WHERE id = ?"
        );
        $stmt->execute([$ocrText, $thumbnailUrl, json_encode($metadata), $job['document_id']]);

        // 6. Mark job complete
        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'completed', processed_at = NOW() WHERE id = ?"
        )->execute([$job['id']]);

        fwrite(STDOUT, "Processed job {$job['id']} — document {$job['document_id']}\n");

    } catch (Throwable $e) {
        $error = $e->getMessage();
        $pdo->prepare(
            "UPDATE processing_jobs SET status = 'failed', error_message = ?, processed_at = NOW() WHERE id = ?"
        )->execute([$error, $job['id']]);

        fwrite(STDERR, "Job {$job['id']} failed: $error\n");
    }
}
```

---

### 4.4 — docker-compose: Add php-worker service

**Objective:** Run PHP worker alongside Express.

**Files:**
- Modify: `docker-compose.yml`
- Modify: `docker-compose.prod.yml`

**Addition to both docker-compose files:**
```yaml
php-worker:
  build:
    context: ./php-auth
    dockerfile: Dockerfile.php-worker
  depends_on:
    db:
      condition: service_healthy
  environment:
    DATABASE_URL: ${DATABASE_URL}
  volumes:
    - uploads_data:/app/uploads
  restart: unless-stopped
```

No nginx, no FPM, no port mapping — purely a background worker.

---

### 4.5 — Admin: Show OCR text & thumbnails in document review

**Objective:** Admin can see the extracted text and thumbnail when reviewing documents.

**Files:**
- Modify: `frontend/src/imports/PlatformAdminDashboard/PlatformAdminDashboard.tsx` — add OCR text preview and thumbnail to document review cards

**Backend:** `adminService.listPendingDocuments()` already returns documents — ensure `ocr_text`, `thumbnail_url`, `doc_metadata` are included in the SELECT.

---

### 4.6 — Railway deployment

**Objective:** The php-worker process runs on Railway.

On Railway, there's no docker-compose — each service is a separate project. Deploy `php-worker` as a separate Railway service:
1. Create new Railway service from the same repo
2. Set root directory to `php-auth`
3. Set start command: `php worker.php`
4. Set `DATABASE_URL` env var to the same database
5. Attach the uploads volume or use cloud storage (S3-compatible)

Alternatively, use a **Procfile** in the root with a worker process type, but Railway's current architecture makes separate services cleaner.

---

## Files Summary

| File | Action | Purpose |
|------|--------|---------|
| `backend/db/migrations/004_processing_jobs.sql` | Create | Queue table + document extensions |
| `backend/services/mechanicService.js` | Modify | Queue job on upload |
| `php-auth/composer.json` | Create | PHP dependencies |
| `php-auth/Dockerfile.php-worker` | Create | PHP worker Docker image |
| `php-auth/worker.php` | Create | Headless worker script |
| `docker-compose.yml` | Modify | Add php-worker service |
| `docker-compose.prod.yml` | Modify | Add php-worker service |
| `frontend/src/imports/PlatformAdminDashboard/PlatformAdminDashboard.tsx` | Modify | Show OCR/thumbnails |

---

## Verification

- [ ] Upload a document → Express responds 201 within 100ms
- [ ] `processing_jobs` row created with `status = 'pending'`
- [ ] PHP worker picks it up within 3 seconds
- [ ] `mechanic_documents.ocr_text` populated with extracted text
- [ ] `mechanic_documents.thumbnail_url` points to generated thumbnail
- [ ] `processing_jobs.status` updated to `completed`
- [ ] Admin dashboard shows OCR text and thumbnail preview
- [ ] Worker handles failure gracefully (files that don't exist, corrupt files)
- [ ] Multiple uploads queued and processed in order

---

*Saved: 2026-06-02. Phase 4 plan as discussed.*
