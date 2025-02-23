const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  companyName: {
    type: String,
    trim: true,
    required: true
  },
  companyEmail: {
    type: String,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
    lowercase: true,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String
  },
  token: { type: String },
  location: {
    type: String,
    trim: true
  }, 
  about: {
    type: String,
    trim: true
  },
  numberOfEmployees: {  
    type: Number,
    required: true
  },
  website: {
    type: String,
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
    lowercase: true,
    required: true,
  },
  contactNumber: {
    type: String,
    trim: true,
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


module.exports = mongoose.model('Companies', CompanySchema);
