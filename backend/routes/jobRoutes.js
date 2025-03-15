require("module-alias/register");
const express = require("express");
const router = express.Router();
const jobsController = require("@controllers/jobs");
const Validation = require("@validation/jobposting");
const Responder = require("@service/responder");
const multer = require("multer");

router.post(
  "/post-job",
  Validation.createJob(), // Add validation for creating a job
  Responder.validate.bind(Responder),
  jobsController.createJob.bind(jobsController)
);

module.exports = router;
