const mongoose = require('mongoose');

const reportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Report must have a title']
    },
    photo: {
      type: String,
      required: [true, 'Report must have a photo']
    },
    description: {
      type: String,
      required: [true, 'Report must have a description']
    },
    date: {
      type: Date,
      default: Date.now()
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Report must belong to an user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reportSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
