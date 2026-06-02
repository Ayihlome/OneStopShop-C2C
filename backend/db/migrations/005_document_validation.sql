-- =================================================================
-- 005_document_validation.sql
-- Adds validation_result JSONB column to mechanic_documents
-- for storing auto-verification results from the PHP worker
-- (keyword matches, score, auto_verified flag)
-- =================================================================

ALTER TABLE mechanic_documents
  ADD COLUMN IF NOT EXISTS validation_result JSONB DEFAULT '{}';
