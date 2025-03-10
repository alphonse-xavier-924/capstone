import React, { useState } from "react";
import "./jobposting.css";

const Jobposting = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    yearsOfExperience: "",
    salaryFrom: "",
    salaryTo: "",
    skills: [],
    roleType: "Full Time",
    jobLocation: "Hybrid",
    sponsorship: false,
    veteran: false,
    disabilities: false,
  });

  const [skill, setSkill] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const addSkill = () => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkill("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.jobDescription.length < 500) {
      newErrors.jobDescription =
        "Job description must be at least 500 characters.";
    }
    if (!/^\d+$/.test(formData.salaryFrom)) {
      newErrors.salaryFrom = "Salary must be a number.";
    }
    if (!/^\d+$/.test(formData.salaryTo)) {
      newErrors.salaryTo = "Salary must be a number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      console.log(formData);
    }
  };

  return (
    <div className="jobposting-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
            minLength="500"
          ></textarea>
          {errors.jobDescription && (
            <p className="error">{errors.jobDescription}</p>
          )}
        </div>
        <div className="form-group">
          <label>Years of Experience Required</label>
          <select
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            required
          >
            <option value="">Select experience</option>
            <option value="0 to 2">0 to 2</option>
            <option value="2 to 5">2 to 5</option>
            <option value=">5">More than 5 years</option>
          </select>
          {errors.yearsOfExperience && (
            <p className="error">{errors.yearsOfExperience}</p>
          )}
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <div className="salary-range">
            <input
              type="text"
              name="salaryFrom"
              placeholder="From"
              value={formData.salaryFrom}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="salaryTo"
              placeholder="To"
              value={formData.salaryTo}
              onChange={handleChange}
              required
            />
          </div>
          {errors.salaryFrom && <p className="error">{errors.salaryFrom}</p>}
          {errors.salaryTo && <p className="error">{errors.salaryTo}</p>}
        </div>
        <div className="form-group">
          <label>Skills</label>
          <div className="skills-input">
            <input
              type="text"
              value={skill}
              onChange={handleSkillChange}
              placeholder="Enter a skill"
            />
            <button type="button" onClick={addSkill}>
              Add
            </button>
          </div>
          <ul className="skills-list">
            {formData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label>Role Type</label>
          <select
            name="roleType"
            value={formData.roleType}
            onChange={handleChange}
            required
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div className="form-group">
          <label>Job Location</label>
          <select
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            required
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <label className="candidate-questions-title">
          What questions do you want the candidate to answer?
        </label>
        <div className="candidate-questions">
          <div className="question-group">
            <label>
              <input
                type="checkbox"
                name="sponsorship"
                checked={formData.sponsorship}
                onChange={handleChange}
              />
              Do you need sponsorship to work in this role?
            </label>
          </div>
          <div className="question-group">
            <label>
              <input
                type="checkbox"
                name="veteran"
                checked={formData.veteran}
                onChange={handleChange}
              />
              Are you a veteran?
            </label>
          </div>
          <div className="question-group">
            <label>
              <input
                type="checkbox"
                name="disabilities"
                checked={formData.disabilities}
                onChange={handleChange}
              />
              Do you have any disabilities?
            </label>
          </div>
        </div>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default Jobposting;
