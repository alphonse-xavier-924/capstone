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
    const jobApplications = await JobApplications.find({ candidateId }).populate('companyId', 'companyName').populate('jobId', 'jobTitle');
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};

exports.getApplicationsByJobId = async (req, res) => {
  const { jobId } = req.params;

  try {
    const jobApplications = await JobApplications.find({ jobId }).populate('candidateId', 'name').populate('jobId', 'jobTitle');
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job applications" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const updatedApplication = await JobApplications.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Job application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ error: "Failed to update job application status" });
  }
};
