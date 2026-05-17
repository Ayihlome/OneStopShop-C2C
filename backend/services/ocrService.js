const path = require('path');
const { createWorker } = require('tesseract.js');
const { fromPath } = require('pdf2pic');
const logger = require('../utils/logger');

const KEYWORD_GROUPS = {
  id: [
    'identity',
    'national',
    'passport',
    'id number',
    'date of birth',
    'surname',
    'citizen',
    'republic',
    'identification',
  ],
  certification: [
    'certificate',
    'certified',
    'certify',
    'mechanic',
    'automotive',
    'technician',
    'motor',
    'repair',
    'qualification',
    'competency',
    'training',
    'apprentice',
    'trade',
    'artisan',
    'diploma',
    'degree',
    'institute',
    'college',
    'university',
    'awarded',
    'completed',
    'course',
    'workshop',
    'accredited',
    'merseta',
    'tvet',
    'nated',
    'engineering',
  ],
  proof_of_residence: [
    'address',
    'residence',
    'resident',
    'street',
    'avenue',
    'road',
    'municipality',
    'utility',
    'account',
    'water',
    'electricity',
    'rates',
    'statement',
    'invoice',
    'tenant',
    'landlord',
    'lease',
  ],
};

function isPdf(filePath) {
  return path.extname(filePath).toLowerCase() === '.pdf';
}

async function renderFirstPdfPage(filePath) {
  const convert = fromPath(filePath, {
    density: 300,
    format: 'png',
  });

  const output = await convert(1, { responseType: 'buffer' });

  if (Buffer.isBuffer(output)) {
    return output;
  }

  if (output && Buffer.isBuffer(output.buffer)) {
    return output.buffer;
  }

  throw new Error('PDF page conversion did not return a PNG buffer');
}

async function recognizeText(input) {
  let worker;

  try {
    worker = await createWorker('eng', 1, {
      cachePath: process.env.TESSDATA_CACHE_PATH,
      logger: (message) => {
        if (message.status === 'recognizing text') {
          logger.debug('OCR recognition progress', {
            progress: message.progress,
          });
        }
      },
    });

    const result = await worker.recognize(input);
    return {
      text: result.data.text || '',
      confidence: Number(result.data.confidence || 0),
    };
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
}

function matchKeywords(text, docType) {
  const normalizedText = String(text || '').toLowerCase();
  const keywords = KEYWORD_GROUPS[docType] || [];

  return keywords.filter((keyword) => normalizedText.includes(keyword.toLowerCase()));
}

async function scanDocument(filePath, docType) {
  const input = isPdf(filePath) ? await renderFirstPdfPage(filePath) : filePath;
  const { text, confidence } = await recognizeText(input);
  const matchedKeywords = matchKeywords(text, docType);
  const passed = matchedKeywords.length >= 2;

  logger.info('Document OCR scan completed', {
    docType,
    confidence,
    matchedKeywords,
    passed,
  });

  return {
    passed,
    matchedKeywords,
    confidence,
    extractedText: text,
  };
}

module.exports = {
  scanDocument,
};
