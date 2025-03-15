const JobApplications = require("../models/jobApplications");
require("module-alias/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Responder = require("@service/responder");
const multer = require("multer");
const upload = multer();

exports.createJobApplication = async (req, res) => {
  const { candidateId, jobId, companyId, resume, coverLetter } = req.body;

  if (!candidateId || !jobId || !companyId) {
    return res
      .status(400)
      .json({ error: "Candidate ID, Job ID, and Company ID are required" });
  }

  try {
    const newApplication = new JobApplications({
      candidateId,
      jobId,
      companyId,
      status: "Pending",
      resume,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: "Failed to create job application" });
  }
};

exports.getJobsByCandidateId = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const jobApplications = await JobApplications.find({ candidateId });
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};
