require('module-alias/register')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Companies = require('@models/companies');
const Responder =  require("@service/responder");


module.exports = {
  async signup(req, res){
    try{
      console.log("company signup");
      let companyExists = await Companies.findOne({ companyEmail: req.body.companyEmail });
      if(companyExists){
        return Responder.respondWithError(req, res, "Company already exists");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const company = new Companies({
        companyName: req.body.companyName,
        companyEmail: req.body.companyEmail,
        password: hashedPassword
      });
      await company.save();

      Responder.respondWithSuccess(req, res, "Company created successfully");

    }catch(err){
      console.log("Error in company signup", err);
      Responder.respondWithError(req, res, "Server Error");
    }
  },
  async editProfile(req, res){
    try{
      let company = await Companies.findOne({ _id: req.body.companyId });
      if(!company){
        return Responder.respondWithError(req, res, "Company not found");
      }
      if(req.body && req.body.companyName && company.companyName !== req.body.companyName){
        company.companyName = req.body.companyName;
      }

      company.location = req.body.location;
      company.about = req.body.about;
      company.numberOfEmployees = req.body.numberOfEmployees;
      company.website = req.body.website;
      company.contactNumber = req.body.contactNumber;
      company.contactEmail = req.body.contactEmail;
      await company.save();

      Responder.respondWithSuccess(req, res, "Company updated successfully");

    }catch(err){
      console.log("Error in company editProfile", err);
      Responder.respondWithError(req, res, "Server Error");
    } 
  }
}