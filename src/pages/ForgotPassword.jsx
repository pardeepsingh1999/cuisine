import React from "react";
import {
  //useNavigate,
  Link,
} from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = () => {
  return (
    <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
      <div className="card-body items-center text-center pt-4">
        <h2 className="card-title">Forgot Password</h2>

        <div className="form-control w-full max-w-sm">
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <label className="input-group">
            <span>
              <AiOutlineMail />
            </span>
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-sm"
            />
          </label>

          <label className="label">
            <span className="label-text-alt text-error">Bottom Left label</span>
          </label>
        </div>
        <div className="card-actions justify-end mt-4">
          <div>
            <button className="btn btn-primary">Forgot Password</button>

            <div className="mt-4">
              <Link className="link link-primary ml-1" to="/login">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
