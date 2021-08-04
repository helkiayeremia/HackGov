const User = require('../models/userModel');
const Report = require('../models/reportModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReportsByUserId = catchAsync(async (req, res, next) => {
  console.log('masuk');
  const doc = await Report.find({ user: req.user.id });

  if (!doc) {
    return next(new AppError('No document created by this user!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
