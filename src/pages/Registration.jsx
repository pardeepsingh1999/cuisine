import React from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>Registration</p>

      <button className="btn" onClick={() => navigate("/login")}>
        login
      </button>
    </div>
  );
};

export default Registration;
