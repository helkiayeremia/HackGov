const mongoose = require('mongoose');

const subdistrictSchema = mongoose.Schema(
  {
    subdistrictName: {
      type: String,
      required: [true, 'subdistrict must have a name']
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
    lastWeekCase: Number,
    thisWeekCase: Number,
    history: [Number],
    prediction: [Number]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Subdistrict = mongoose.model('Subdistrict', subdistrictSchema);

module.exports = Subdistrict;
