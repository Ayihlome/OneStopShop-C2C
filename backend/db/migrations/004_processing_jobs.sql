-- =================================================================
-- 004_processing_jobs.sql
-- Queue table for background document processing jobs, plus
-- OCR/thumbnail columns on mechanic_documents.
-- =================================================================

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

ALTER TABLE mechanic_documents
  ADD COLUMN IF NOT EXISTS ocr_text TEXT,
  ADD COLUMN IF NOT EXISTS thumbnail_url VARCHAR(500),
  ADD COLUMN IF NOT EXISTS doc_metadata JSONB DEFAULT '{}';
