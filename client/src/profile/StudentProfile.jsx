import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Select from "react-select";
import "./studentprofile.css";
import { jobTitles } from "./jobTitles";
import useLocationAutocomplete from "./UseLocationAutoComplete";
const rpaTools = [
  "UiPath",
  "Automation Anywhere",
  "Blue Prism",
  "Pega",
  "WorkFusion",
  "Kofax",
  "NICE",
  "Microsoft Power Automate",
  "Kryon",
  "AntWorks",
  "EdgeVerve",
  "HelpSystems",
  "Softomotive",
  "Redwood",
  "AutomationEdge",
];
const rpaToolOptions = rpaTools.map((tool) => ({ value: tool, label: tool }));
const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    jobTitle: "",
    location: "",
    about: "",
    experience: [],
    education: [],
    certifications: "",
    links: { github: "", medium: "", other: "" },
    rpaSkills: [],
    otherSkills: [],
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [locationQuery, setLocationQuery] = useState("");
  const locationSuggestions = useLocationAutocomplete(locationQuery);
  const [jobTitleQuery, setJobTitleQuery] = useState("");
  const filteredJobTitles = jobTitles.filter((title) =>
    title.toLowerCase().includes(jobTitleQuery.toLowerCase())
  );
  const [originalProfile, setOriginalProfile] = useState(profile);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/candidates/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        const data = await response.json();
        setProfile(data);
        setOriginalProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);
  const handleEditClick = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setErrors({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setLocationQuery(value);
    setProfile((prevProfile) => ({ ...prevProfile, location: value }));
  };
  const handleLocationSelect = (location) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      location: location.display_name,
    }));
    setLocationQuery("");
  };
  const handleJobTitleChange = (e) => {
    const { value } = e.target;
    setJobTitleQuery(value);
    setProfile((prevProfile) => ({ ...prevProfile, jobTitle: value }));
  };
  const handleJobTitleSelect = (title) => {
    setProfile((prevProfile) => ({ ...prevProfile, jobTitle: title }));
    setJobTitleQuery("");
  };
  const handleLinksChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      links: { ...prevProfile.links, [name]: value },
    }));
  };
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...profile.experience];
    updatedExperience[index][name] = value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: updatedExperience,
    }));
  };
  const handleAddExperience = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: [
        ...prevProfile.experience,
        { company: "", startDate: "", endDate: "", role: "", description: "" },
      ],
    }));
  };
  const handleRemoveExperience = (index) => {
    const updatedExperience = profile.experience.filter((_, i) => i !== index);
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: updatedExperience,
    }));
  };
  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...profile.education];
    updatedEducation[index][name] = value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: updatedEducation,
    }));
  };
  const handleAddEducation = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: [
        ...prevProfile.education,
        { school: "", degree: "", grade: "" },
      ],
    }));
  };
  const handleRemoveEducation = (index) => {
    const updatedEducation = profile.education.filter((_, i) => i !== index);
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: updatedEducation,
    }));
  };
  const handleRPASkillChange = (selectedOptions) => {
    const selectedSkills = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setProfile((prevProfile) => ({
      ...prevProfile,
      rpaSkills: selectedSkills,
    }));
  };
  const handleAddOtherSkill = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      otherSkills: [...prevProfile.otherSkills, ""],
    }));
  };
  const handleOtherSkillChange = (index, e) => {
    const { value } = e.target;
    const updatedSkills = [...profile.otherSkills];
    updatedSkills[index] = value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      otherSkills: updatedSkills,
    }));
  };
  const handleRemoveOtherSkill = (index) => {
    const updatedSkills = profile.otherSkills.filter((_, i) => i !== index);
    setProfile((prevProfile) => ({
      ...prevProfile,
      otherSkills: updatedSkills,
    }));
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file && /\.(pdf|doc|docx)$/i.test(file.name)) {
      setProfile((prevProfile) => ({ ...prevProfile, resume: file }));
    } else {
      alert("Please upload a valid file (PDF, DOC, or DOCX).");
    }
  };
  const validate = () => {
    const newErrors = {};
    profile.experience.forEach((exp, index) => {
      if (!exp.company) {
        newErrors[`experience-${index}-company`] = "Company is required";
      }
      if (!exp.role) {
        newErrors[`experience-${index}-role`] = "Role is required";
      }
    });
    profile.education.forEach((edu, index) => {
      if (!edu.school) {
        newErrors[`education-${index}-school`] = "School is required";
      }
      if (!edu.degree) {
        newErrors[`education-${index}-degree`] = "Degree is required";
      }
    });
    profile.otherSkills.forEach((skill, index) => {
      if (skill.length < 3) {
        newErrors[`otherSkills-${index}`] =
          "Skill must be at least 3 characters";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async () => {
    if (validate()) {
      try {
        let resumeUrl = profile.resume;
        const formData = new FormData();
        formData.append("resume", resumeUrl);
        const token = localStorage.getItem("userToken");
        const decodedToken = jwtDecode(token);
        const candidateId = decodedToken.candidate.id;
        formData.append("candidateId", candidateId);
        formData.append("currentJobTitle", profile.jobTitle);
        formData.append("location", profile.location);
        formData.append("about", profile.about);
        formData.append("certifications", profile.certifications);
        formData.append("links[github]", profile.links.github);
        formData.append("links[medium]", profile.links.medium);
        formData.append("links[other]", profile.links.other);
        profile.experience.forEach((exp, index) => {
          formData.append(`experience[${index}][company]`, exp.company);
          formData.append(`experience[${index}][startDate]`, exp.startDate);
          formData.append(`experience[${index}][endDate]`, exp.endDate);
          formData.append(`experience[${index}][role]`, exp.role);
          formData.append(`experience[${index}][description]`, exp.description);
        });
        profile.education.forEach((edu, index) => {
          formData.append(`education[${index}][school]`, edu.school);
          formData.append(`education[${index}][degree]`, edu.degree);
          formData.append(`education[${index}][grade]`, edu.grade);
        });
        profile.rpaSkills.forEach((skill, index) => {
          formData.append(`rpaSkills[${index}]`, skill);
        });
        profile.otherSkills.forEach((skill, index) => {
          formData.append(`otherSkills[${index}]`, skill);
        });
        const response = await fetch(
          "http://localhost:4000/api/candidates/editProfile",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        if (response.ok) {
          setIsEditing(false);
          const updatedProfile = await response.json();
          setProfile(updatedProfile);
          setOriginalProfile(updatedProfile);
        } else {
          const errorData = await response.json();
          console.error("Error saving profile data:", errorData);
        }
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    }
  };
  return (
    <div className="student-profile">
      <div className="profile-header">
        <h2>My Profile</h2>
        <button
          className="edit-button"
          onClick={handleEditClick}
          disabled={isEditing}
        >
          <i className="bi bi-pen"></i> Edit
        </button>
      </div>
      <div className="profile-section">
        <label>Job Title:</label>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="jobTitle"
              placeholder="Student, Automation Intern, RPA Engineer, etc."
              value={profile.jobTitle}
              onChange={handleJobTitleChange}
            />
            {jobTitleQuery && (
              <ul className="job-title-suggestions">
                {filteredJobTitles.map((title, index) => (
                  <li key={index} onClick={() => handleJobTitleSelect(title)}>
                    {title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>{profile.jobTitle}</p>
        )}
      </div>
      <div className="profile-section">
        <label>Location:</label>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleLocationChange}
            />
            {locationSuggestions.length > 0 && (
              <ul className="location-suggestions">
                {locationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleLocationSelect(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>{profile.location}</p>
        )}
      </div>
      <div className="profile-section">
        <label>About:</label>
        {isEditing ? (
          <textarea
            name="about"
            value={profile.about}
            onChange={handleChange}
            maxLength="2600"
          />
        ) : (
          <p>{profile.about}</p>
        )}
      </div>
      <div className="profile-section">
        <label>Resume:</label>
        {isEditing ? (
          <>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
            {errors.resume && <p className="error">{errors.resume}</p>}
          </>
        ) : (
          profile.resume && <p>{profile.resume.name}</p>
        )}
      </div>
      <div className="profile-section">
        <label>Experience:</label>
        {isEditing ? (
          <>
            {profile.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <input
                  type="text"
                  name="company"
                  placeholder="Company (required)"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />
                {errors[`experience-${index}-company`] && (
                  <p className="error">
                    {errors[`experience-${index}-company`]}
                  </p>
                )}
                <input
                  type="date"
                  name="startDate"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
                <input
                  type="date"
                  name="endDate"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role (required)"
                  value={exp.role}
                  onChange={(e) => handleExperienceChange(index, e)}
                  required
                />
                {errors[`experience-${index}-role`] && (
                  <p className="error">{errors[`experience-${index}-role`]}</p>
                )}
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={handleAddExperience}
            >
              <i className="bi bi-plus-circle"></i> Add Experience
            </button>
          </>
        ) : (
          profile.experience.map((exp, index) => (
            <div key={index}>
              <p>Company: {exp.company}</p>
              <p>Start Date: {exp.startDate}</p>
              <p>End Date: {exp.endDate}</p>
              <p>Role: {exp.role}</p>
              <p>Description: {exp.description}</p>
            </div>
          ))
        )}
      </div>
      <div className="profile-section">
        <label>Education:</label>
        {isEditing ? (
          <>
            {profile.education.map((edu, index) => (
              <div key={index} className="education-item">
                <input
                  type="text"
                  name="school"
                  placeholder="School (required)"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, e)}
                  required
                />
                {errors[`education-${index}-school`] && (
                  <p className="error">{errors[`education-${index}-school`]}</p>
                )}
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree (required)"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  required
                />
                {errors[`education-${index}-degree`] && (
                  <p className="error">{errors[`education-${index}-degree`]}</p>
                )}
                <input
                  type="text"
                  name="grade"
                  placeholder="Grade"
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={handleAddEducation}
            >
              <i className="bi bi-plus-circle"></i> Add Education
            </button>
          </>
        ) : (
          profile.education.map((edu, index) => (
            <div key={index}>
              <p>School: {edu.school}</p>
              <p>Degree: {edu.degree}</p>
              <p>Grade: {edu.grade}</p>
            </div>
          ))
        )}
      </div>
      <div className="profile-section">
        <label>Certifications:</label>
        {isEditing ? (
          <textarea
            name="certifications"
            value={profile.certifications}
            onChange={handleChange}
          />
        ) : (
          <p>{profile.certifications}</p>
        )}
      </div>
      <div className="profile-section">
        <label>Links:</label>
        {isEditing ? (
          <>
            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={profile.links.github}
              onChange={handleLinksChange}
            />
            <input
              type="text"
              name="medium"
              placeholder="Medium"
              value={profile.links.medium}
              onChange={handleLinksChange}
            />
            <input
              type="text"
              name="other"
              placeholder="Other"
              value={profile.links.other}
              onChange={handleLinksChange}
            />
          </>
        ) : (
          <div>
            <p>GitHub: {profile.links.github}</p>
            <p>Medium: {profile.links.medium}</p>
            <p>Other: {profile.links.other}</p>
          </div>
        )}
      </div>
      <div className="profile-section">
        <label>RPA Skills:</label>
        {isEditing ? (
          <Select
            isMulti
            name="rpaSkills"
            options={rpaToolOptions}
            value={rpaToolOptions.filter((option) =>
              profile.rpaSkills.includes(option.value)
            )}
            onChange={handleRPASkillChange}
          />
        ) : (
          <ul>
            {profile.rpaSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="profile-section">
        <label>Other Skills:</label>
        {isEditing ? (
          <>
            {profile.otherSkills.map((skill, index) => (
              <div key={index} className="other-skill-item">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleOtherSkillChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOtherSkill(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={handleAddOtherSkill}
            >
              <i className="bi bi-plus-circle"></i> Add Skill
            </button>
          </>
        ) : (
          <ul>
            {profile.otherSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
      {isEditing && (
        <div className="profile-actions">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default StudentProfile;
