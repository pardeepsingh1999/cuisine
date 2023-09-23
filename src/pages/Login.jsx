import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>login</p>

      <button className="btn" onClick={() => navigate("/registration")}>
        Registration
      </button>
      <button className="btn" onClick={() => navigate("/forgot-password")}>
        forgot-password
      </button>
    </div>
  );
};

export default Login;
