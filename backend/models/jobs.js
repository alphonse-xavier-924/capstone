const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobsSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Companies',
    required: true
  },
  jobTitle: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  yrsofExperience: {
    type: Number,
    required: true
  },
  salaryStart: {
    type: Number,
    required: true
  },
  salaryEnd: {
    type: Number,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  roleType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship']
  },
  jobLocation: {
    type: String,
    required: true,
    enum: ['Remote', 'Onsite', 'Hybrid']
  },
  sponsorhip: {
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});


module.exports = mongoose.model('Jobs', JobsSchema);

