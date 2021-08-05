const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // keep images size < 5 MB
  }
});

exports.imageUploader = uploader.single('photo');

// Create new storage instance with Firebase project credentials
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS
});

// Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

exports.saveImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No image uploaded', 500));
  }

  const token = process.env.FIREBASE_TOKEN;

  // Create new blob in the bucket referencing the file
  const blob = bucket.file(req.file.originalname);

  // Create writable stream and specifying file mimetype
  const blobWriter = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: { firebaseStorageDownloadTokens: token }
    }
  });

  blobWriter.on('error', err => next(err));

  blobWriter.on('finish', () => {
    // Assembling public URL for accessing the file via HTTP
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
      bucket.name
    }/o/${encodeURI(blob.name)}?alt=media&token=${token}`;

    req.body.photo = publicUrl;
    next();
  });

  blobWriter.end(req.file.buffer);
});
