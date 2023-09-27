import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";

import { hideLoader, showLoader } from "../redux/actions";
import { errorHandler, showToast } from "../helpers";
import { RegexConfig } from "../config/RegexConfig";
import { firebaseAuth } from "../firebase";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState({});
  const [errors, setErrors] = useState({});

  const _validateFormFields = ({ newFormFields, newIsDirty }) => {
    return new Promise((resolve) => {
      const newErrors = {};
      let isFormValid = true;

      Object.keys(newFormFields).forEach((key) => {
        if (newIsDirty[key]) {
          switch (key) {
            case "email": {
              if (newFormFields[key]?.trim().length) {
                if (
                  RegexConfig[key].test(
                    String(newFormFields[key]).toLowerCase()
                  )
                ) {
                  newErrors[key] = null;
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] = `*Invalid ${key}`;
                  isFormValid = false;
                }
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;
            }
            default:
          }
        }
      });

      setErrors((prev) => ({
        ...prev,
        ...newErrors,
      }));

      setIsDirty((prev) => ({
        ...prev,
        ...newIsDirty,
      }));

      resolve(isFormValid);
    });
  };

  const _onChangeFormFields = (key, value) => {
    const newFormFields = { ...formFields };
    newFormFields[key] = value;
    setFormFields(newFormFields);
  };

  const _onBlurFormFields = (key) => {
    const newFormFields = { ...formFields };
    const newIsDirty = {
      [key]: true,
    };

    _validateFormFields({ newFormFields, newIsDirty });
  };

  const _markAllIsDirty = () => {
    return new Promise((resolve) => {
      const newFormFields = { ...formFields };
      const newIsDirty = { ...isDirty };
      Object.keys(newFormFields).forEach((key) => {
        newIsDirty[key] = true;
      });
      setIsDirty(newIsDirty);
      resolve(newIsDirty);
    });
  };

  const _onSubmitForm = async (event) => {
    try {
      if (event) event.preventDefault();

      const newFormFields = { ...formFields };

      const newIsDirty = await _markAllIsDirty();

      const isFormValid = await _validateFormFields({
        newFormFields,
        newIsDirty,
      });

      if (!isFormValid) {
        return;
      }

      dispatch(showLoader("Please wait.."));

      await sendPasswordResetEmail(firebaseAuth, newFormFields.email.trim());

      showToast("We have emailed the reset password instructions.", "success");

      navigate("/login");

      dispatch(hideLoader());
    } catch (error) {
      errorHandler(error);
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title">Forgot Password</h2>

          <form onSubmit={_onSubmitForm} className="contents">
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
                  value={formFields.email}
                  onChange={(e) => _onChangeFormFields("email", e.target.value)}
                  onBlur={() => _onBlurFormFields("email")}
                />
              </label>
              {errors?.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Forgot Password
              </button>
            </div>
          </form>

          <div className="card-actions justify-end mt-4">
            <div className="mt-4">
              <Link className="link link-primary ml-1" to="/login">
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
