import React, { useEffect, useState } from "react";
import "./joblist.css";

const Joblist = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/jobs/active-jobs"
        );
        const data = await response.json();
        console.log("Fetched jobs:", data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    // Handle the apply logic here
    console.log("Applying for job:", jobId);
  };

  return (
    <div className="joblist-container">
      <h2>Job Listings</h2>
      <div className="joblist">
        {jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p>{job.description}</p>
            <p>
              <strong>Required Experience:</strong> {job.yrsofExperience} years
            </p>
            <p>
              <strong>Salary:</strong> ${job.salaryStart} - ${job.salaryEnd}
            </p>
            <p>
              <strong>Location:</strong> {job.jobLocation}
            </p>
            <p>
              <strong>Company:</strong> {job.companyId.companyName}
            </p>
            <p>
              <strong>Required Skills:</strong> {job.skills.join(", ")}
            </p>
            <button onClick={() => handleApply(job._id)}>Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Joblist;
