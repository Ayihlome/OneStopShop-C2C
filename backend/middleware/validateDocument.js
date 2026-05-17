const fs = require('fs/promises');
const path = require('path');
const FileType = require('file-type');
const pdfParse = require('pdf-parse');
const sharp = require('sharp');
const logger = require('../utils/logger');
const { createError } = require('../utils/errors');

const ALLOWED_MIME_TYPES = new Set(['application/pdf', 'image/jpeg', 'image/png']);

function normalizeMimeType(mimeType) {
  if (mimeType === 'image/jpg') {
    return 'image/jpeg';
  }

  return mimeType;
}

async function removeFile(filePath) {
  if (!filePath) {
    return;
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function rejectUploadedFile(filePath, statusCode, message) {
  await removeFile(filePath);
  throw createError(statusCode, message);
}

async function validatePdf(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const parsed = await pdfParse(buffer);

    if (!parsed || !parsed.numpages) {
      await rejectUploadedFile(filePath, 400, 'Invalid or corrupt PDF');
    }
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    await rejectUploadedFile(filePath, 400, 'Invalid or corrupt PDF');
  }
}

async function validateAndStripImage(filePath) {
  const extension = path.extname(filePath);
  const tempPath = `${filePath}.stripped${extension}`;

  try {
    await sharp(filePath).metadata();
    await sharp(filePath).rotate().toFile(tempPath);
    await fs.rename(tempPath, filePath);
  } catch (error) {
    await removeFile(tempPath);
    await rejectUploadedFile(filePath, 400, 'Invalid image file');
  }
}

async function validateDocument(req, res, next) {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;

  try {
    const detected = await FileType.fromFile(filePath);
    const actualMimeType = normalizeMimeType(detected && detected.mime);
    const declaredMimeType = normalizeMimeType(req.file.mimetype);

    if (!actualMimeType || !ALLOWED_MIME_TYPES.has(actualMimeType)) {
      await rejectUploadedFile(filePath, 400, 'Invalid document file type');
    }

    if (actualMimeType !== declaredMimeType) {
      await rejectUploadedFile(filePath, 400, 'Uploaded file type does not match its contents');
    }

    if (actualMimeType === 'application/pdf') {
      await validatePdf(filePath);
    } else {
      await validateAndStripImage(filePath);
    }

    return next();
  } catch (error) {
    if (!error.statusCode) {
      try {
        await removeFile(filePath);
      } catch (cleanupError) {
        logger.warn('Uploaded document cleanup failed after validation error', {
          filePath,
          cleanupError: cleanupError.message,
        });
      }
    }

    return next(error);
  }
}

module.exports = validateDocument;
