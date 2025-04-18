import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import "./joblist.css";

const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [coverLetters, setCoverLetters] = useState({});



  const handleCoverLetterChange = (e, jobId) => {
    const file = e.target.files[0];
    setCoverLetters((prev) => ({ ...prev, [jobId]: file }));
  };

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

    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("userToken");
      const candidateId = jwtDecode(token).candidate.id;

      try {
        const response = await fetch(
          `http://localhost:4000/api/job-applications/candidate/${candidateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched applied jobs:", data);
        setAppliedJobs(data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, []);

  // const handleApply = async (jobId, companyId) => {
  //   if (hasApplied(jobId)) {
  //     console.log("You have already applied for this job.");
  //     return;
  //   }

  //   console.log("Applying to job:", jobId);
  //   console.log("Decoded companyId:", companyId);

  //   const token = localStorage.getItem("userToken");
  //   const candidateId = jwtDecode(token).candidate.id;
  //   const coverLetterFile = coverLetters[jobId];

    

  //   const resume = "path/to/resume.pdf"; // Replace with actual resume path
  //   // const coverLetter = "Cover letter content"; // Replace with actual cover letter content

  //   // Optimistically update the state
  //   setAppliedJobs((prevAppliedJobs) => [
  //     ...prevAppliedJobs,
  //     { jobId: { _id: jobId } }, // Add the applied job to the state
  //   ]);

  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/job-applications/create",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           candidateId,
  //           jobId,
  //           companyId,
  //           resume,
  //           coverLetter,
  //         }),
  //       }
  //     );

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Application submitted successfully:", data);
  //     } else {
  //       console.error("Failed to submit application:", data);

  //       // Revert the optimistic update if the API call fails
  //       setAppliedJobs((prevAppliedJobs) =>
  //         prevAppliedJobs.filter(
  //           (application) => application.jobId._id !== jobId
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error submitting application:", error);

  //     // Revert the optimistic update if an error occurs
  //     setAppliedJobs((prevAppliedJobs) =>
  //       prevAppliedJobs.filter((application) => application.jobId._id !== jobId)
  //     );
  //   }
  // };

  const handleApply = async (jobId, companyId) => {
    if (hasApplied(jobId)) return;
    console.log("companyId:", companyId);
  
    const token = localStorage.getItem("userToken");
    const candidateId = jwtDecode(token).candidate.id;
    const coverLetterFile = coverLetters[jobId];
  
    const formData = new FormData();
    formData.append("candidateId", candidateId);
    formData.append("jobId", jobId);
    formData.append("companyId", companyId._id);
    formData.append("resume", "path/to/resume.pdf"); // Replace with actual resume logic
    if (coverLetterFile) {
      formData.append("file", coverLetterFile);
    }
  
    setAppliedJobs((prev) => [...prev, { jobId: { _id: jobId } }]);
  
    try {
      const response = await fetch("http://localhost:4000/api/job-applications/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Application error:", data);
        setAppliedJobs((prev) => prev.filter((j) => j.jobId._id !== jobId));
      } else {
        console.log("Applied successfully:", data);
      }
    } catch (err) {
      console.error("Error applying:", err);
      setAppliedJobs((prev) => prev.filter((j) => j.jobId._id !== jobId));
    }
  };

  const handleWithdraw = async (jobId) => {
    console.log("Withdrawing application for job:", jobId);

    const token = localStorage.getItem("userToken");
    const candidateId = jwtDecode(token).candidate.id;

    try {
      const response = await fetch(
        `http://localhost:4000/api/job-applications/candidate/${candidateId}/withdraw/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Application withdrawn successfully");
        // Update the state to remove the withdrawn job
        setAppliedJobs((prevAppliedJobs) =>
          prevAppliedJobs.filter(
            (application) => application.jobId._id !== jobId
          )
        );
      } else {
        const data = await response.json();
        console.error("Failed to withdraw application:", data);
      }
    } catch (error) {
      console.error("Error withdrawing application:", error);
    }
  };

  const hasApplied = (jobId) => {
    console.log("Checking if applied for job:", jobId);
    console.log("Applied jobs:", appliedJobs);

    // Check if the jobId matches the _id property of the jobId object in appliedJobs
    return appliedJobs.some((application) => application.jobId._id === jobId);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
            <p>
              <strong>Posted on:</strong> {formatDate(job.createdAt)}
            </p>
            {hasApplied(job._id) ? (
              <div>
                <button style={{ backgroundColor: "green" }}>
                  Already Applied
                </button>
                <button
                  style={{ backgroundColor: "red", marginLeft: "10px" }}
                  onClick={() => handleWithdraw(job._id)}
                >
                  Withdraw
                </button>
              </div>
            ) : (
              <div>
                <p>
                <strong>Upload Cover Leter: </strong> 
                
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleCoverLetterChange(e, job._id)}
                />
                </p>
              <button onClick={() => handleApply(job._id, job.companyId)}>
                Apply
              </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Joblist;
