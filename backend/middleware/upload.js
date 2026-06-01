const fs = require('fs');
const path = require('path');
const multer = require('multer');

const docUploadDir = path.resolve(__dirname, '..', 'uploads', 'documents');
fs.mkdirSync(docUploadDir, { recursive: true });

const photoUploadDir = path.resolve(__dirname, '..', 'uploads', 'photos');
fs.mkdirSync(photoUploadDir, { recursive: true });

const allowedExtensions = new Set(['.pdf', '.jpg', '.jpeg', '.png']);
const allowedImages = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, docUploadDir);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photoUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `photo-${req.user?.id || 'unknown'}-${Date.now()}${ext}`);
  },
});

const docFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    return cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'));
  }
  return cb(null, true);
};

const photoFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!allowedImages.has(extension)) {
    return cb(new Error('Only JPG, JPEG, PNG, and WebP images are allowed'));
  }
  return cb(null, true);
};

const docUpload = multer({
  storage: docStorage,
  fileFilter: docFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const photoUpload = multer({
  storage: photoStorage,
  fileFilter: photoFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

docUpload.single = docUpload.single.bind(docUpload);
photoUpload.single = photoUpload.single.bind(photoUpload);

module.exports = { docUpload, photoUpload };
