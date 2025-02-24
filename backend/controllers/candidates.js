require('module-alias/register')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Candidates = require('@models/candidates');
const Responder =  require("@service/responder");
const { editProfile } = require('../validations');

module.exports = {
  async signup(req, res){
    try{
      console.log("candidate signup");
      let candidateExists = await Candidates.findOne({ email: req.body.email });
      if(candidateExists){
        return Responder.respondWithError(req, res, "Candidate already exists");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      const candidate = new Candidates({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      });
      await candidate.save();

      Responder.respondWithSuccess(req, res, "Candidate created successfully");

    }catch(err){
      console.log("Error in candidates signup", err);
      Responder.respondWithError(req, res, "Server Error");
    }
  },
  async editProfile(req, res){
    try{
      console.log("editProfile", req.body.candidateId);
      let candidate = await Candidates.findOne({ _id: req.body.candidateId});
      if(!candidate){
        return Responder.respondWithError(req, res, "Candidate not found");
      }

      candidate.currentJobTitle = req.body.currentJobTitle;
      candidate.location = req.body.location;
      candidate.about = req.body.about;
      candidate.experience = req.body.experience; 
      candidate.education = req.body.education;
      candidate.rpaSkills = req.body.rpaSkills;
      candidate.otherSkills = req.body.otherSkills;
      candidate.githubLink = req.body.githubLink;
      candidate.mediumLink = req.body.mediumLink;
      candidate.otherLink = req.body.otherLink;
      await candidate.save();

      Responder.respondWithSuccess(req, res, "Candidate updated successfully");


    }catch(err){
      console.log("Error in candidates editProfile", err);
      Responder.respondWithError(req, res, "Server Error");
    }
  }
}