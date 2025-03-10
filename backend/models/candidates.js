const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const CandidatesSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      lowercase: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: { type: String },
    currentJobTitle: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    resumeLink: {
      type: String,
      trim: true,
    },
    experience: {
      type: [
        {
          companyName: {
            type: String,
            trim: true,
            required: true,
          },
          position: {
            type: String,
            trim: true,
            required: true,
          },
          startDate: {
            type: Date,
          },
          endDate: {
            type: Date,
          },
          description: {
            type: String,
            trim: true,
          },
        },
      ],
    },
    education: {
      type: [
        {
          school: {
            type: String,
            trim: true,
            required: true,
          },
          degree: {
            type: String,
            trim: true,
            required: true,
          },
          grade: {
            type: String,
            enum: ["A", "B", "C", "D", "E", "F"],
            required: true,
          },
        },
      ],
    },
    certifications: [String],
    githubLink: {
      type: String,
      trim: true,
    },
    mediumLink: {
      type: String,
      trim: true,
    },
    linedInLink: {
      type: String,
      trim: true,
    },
    otherLink: {
      type: String,
      trim: true,
    },
    rpaSkills: {
      type: [String],
    },
    otherSkills: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CandidatesSchema.post("save", async function (doc, next) {
  try {
    const existingUser = await User.findOne({ email: doc.email });
    if (!existingUser) {
      await User.create({ email: doc.email, password: doc.password });
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Candidates", CandidatesSchema);
