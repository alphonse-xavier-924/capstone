const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const CompanySchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      required: true,
    },
    companyEmail: {
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
    location: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    numberOfEmployees: {
      type: Number,
    },
    website: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      trim: true,
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

CompanySchema.post("save", async function (doc, next) {
  try {
    await User.create({ email: doc.companyEmail, password: doc.password });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Companies", CompanySchema);
