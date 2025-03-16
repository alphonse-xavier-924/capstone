import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./home.css";

const Home = () => {
  const [candidateName, setCandidateName] = useState("");

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      const token = localStorage.getItem("userToken");
      const candidateId = jwtDecode(token).candidate.id;
      console.log("Decoded candidateId:", candidateId);

      try {
        const response = await fetch(
          `http://localhost:4000/api/candidates/${candidateId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched candidate details:", data.message.name);
        if (response.ok) {
          setCandidateName(data.message.name);
        } else {
          console.error("Failed to fetch candidate details:", data);
        }
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      }
    };

    fetchCandidateDetails();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to OneStop Job Portal, {candidateName}</h1>
    </div>
  );
};

export default Home;
