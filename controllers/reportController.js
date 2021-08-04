const Report = require('../models/reportModel');
const factory = require('./handlerFactory');

exports.setUserId = (req, res, next) => {
  req.body.user = req.user.id;
  next();
};

exports.getAllReports = factory.getAll(Report);
exports.getReport = factory.getOne(Report);
exports.createReport = factory.createOne(Report);
exports.updateReport = factory.updateOne(Report);
exports.deleteReport = factory.deleteOne(Report);
