const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidatesSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
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
  currentJobTitle: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  about: {
    type: String,
    trim: true
  },
  resumeLink: {
    type: String,
    trim: true
  },
  experience: {
    type: [
      {
        companyName: {
          type: String,
          trim: true,
          required: true
        },
        position: {
          type: String,
          trim: true,
          required: true
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date
        },
        description: {
          type: String,
          trim: true
        }
      }
    ]
  },
  education: {
    type: [
      {
        institution: {
          type: String,
          trim: true,
          required: true
        },
        degree: {
          type: String,
          trim: true,
          required: true
        },
        startDate: {
          type: Date,
          required: true
        },
        endDate: {
          type: Date
        },
        grade: {
          type: String,
          enum: ['A', 'B', 'C', 'D', 'E', 'F'],
          required: true
        }
      }
    ]
  },
  certifications: [String],
  githubLink: {
    type: String,
    trim: true
  },
  mediumLink: {
    type: String,
    trim: true
  },
  linedInLink: {
    type: String,
    trim: true
  },
  otherLink: {
    type: String,
    trim: true
  },
  rpaSkills: {
    type: [String]
  },
  otherSkills: {
    type: [String]
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


module.exports = mongoose.model('Candidates', CandidatesSchema);
