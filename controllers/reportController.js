const Report = require('../models/reportModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.createReport = catchAsync(async (req, res, next) => {
  const newDoc = await Report.create({
    title: req.body.title,
    photo: req.body.photo,
    description: req.body.description,
    location: {
      type: 'Point',
      coordinates: [req.body.lng, req.body.lat]
    },
    user: req.body.user
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: newDoc
    }
  });
});

exports.getAllReports = factory.getAll(Report);
exports.getReport = factory.getOne(Report);
exports.updateReport = factory.updateOne(Report);
exports.deleteReport = factory.deleteOne(Report);
