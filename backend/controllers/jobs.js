const Jobs = require("../models/jobs");

exports.createJob = async (req, res) => {
  try {
    const {
      companyId,
      jobTitle,
      description,
      yrsofExperience,
      salaryFrom,
      salaryTo,
      skills,
      roleType,
      jobLocation,
      veteran,
      disabilities,
    } = req.body;

    if (salaryFrom > salaryTo) {
      return res
        .status(400)
        .json({ error: "Salary start value cannot exceed salary end value." });
    }

    const newJob = new Jobs({
      companyId,
      jobTitle,
      description,
      yrsofExperience,
      salaryStart: salaryFrom,
      salaryEnd: salaryTo,
      skills,
      roleType,
      jobLocation,
      veteran,
      disabilities,
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", data: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
