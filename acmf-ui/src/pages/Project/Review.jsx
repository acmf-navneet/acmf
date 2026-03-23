import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, dataToDispatch } = location.state || {}; 

  const handleFinalSubmit = async () => {
    try {
      const response = await fetch("API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...dataToDispatch }),
      });

      if (response.status === 200) {
        alert("Project created successfully!");
        navigate("/"); 
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      alert("Error during submission.");
    }
  };

  return (
    <div>
      <h2>Review Your Project Details</h2>
      <pre>{JSON.stringify({ formData, dataToDispatch }, null, 2)}</pre>
      <button onClick={handleFinalSubmit}>Submit</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Review;
