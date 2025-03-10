const Companies = require("@models/Companies");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Responder = require("@service/responder");

module.exports = {
  async signup(req, res) {
    try {
      const { companyName, companyEmail, password } = req.body;
      const existingCompany = await Companies.findOne({ companyEmail });

      if (existingCompany) {
        return Responder.respondWithError(req, res, "Company already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newCompany = new Companies({
        companyName,
        companyEmail,
        password: hashedPassword,
      });

      await newCompany.save();

      const payload = {
        company: {
          id: newCompany.id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      Responder.respondWithSuccess(req, res, "Signup successful", { token });
    } catch (err) {
      console.log("Error in company signup", err);
      Responder.respondWithError(req, res, "Server Error");
    }
  },

  async editProfile(req, res) {
    try {
      const {
        companyId,
        location,
        about,
        numberOfEmployees,
        website,
        contactNumber,
        contactEmail,
      } = req.body;
      const company = await Companies.findById(companyId);

      if (!company) {
        return Responder.respondWithError(req, res, "Company not found");
      }

      company.location = location || company.location;
      company.about = about || company.about;
      company.numberOfEmployees =
        numberOfEmployees || company.numberOfEmployees;
      company.website = website || company.website;
      company.contactNumber = contactNumber || company.contactNumber;
      company.contactEmail = contactEmail || company.contactEmail;

      await company.save();

      Responder.respondWithSuccess(req, res, "Profile updated successfully");
    } catch (err) {
      console.log("Error in company edit profile", err);
      Responder.respondWithError(req, res, "Server Error");
    }
  },
};
