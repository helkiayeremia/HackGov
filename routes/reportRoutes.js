const express = require('express');
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');
const firebaseController = require('../controllers/firebaseController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/:id')
  .get(reportController.getReport)
  .patch(reportController.updateReport)
  .delete(reportController.deleteReport);

router
  .route('/')
  .get(reportController.getAllReports)
  .post(
    firebaseController.imageUploader,
    firebaseController.saveImage,
    reportController.setUserId,
    reportController.createReport
  );

module.exports = router;
