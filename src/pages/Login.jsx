import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { RegexConfig } from "../config/RegexConfig";
import { errorHandler } from "../helpers";
import { hideLoader, showLoader, updateUserData } from "../redux/actions";
import { firebaseAuth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState({});
  const [errors, setErrors] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);

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
            case "password": {
              if (newFormFields[key]?.trim().length) {
                if (newFormFields[key]?.trim().length >= 6) {
                  newErrors[key] = null;
                  newIsDirty[key] = false;
                } else {
                  newErrors[key] = "*At least 6 characters";
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

  const _completedAuthorization = async (res) => {
    if (!res?.user || !res?._tokenResponse) {
      errorHandler(res);
      dispatch(hideLoader());
      return;
    }

    dispatch(
      updateUserData({ user: res?.user, _tokenResponse: res?._tokenResponse })
    );
    dispatch(hideLoader());
    navigate("/");
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

      dispatch(showLoader("Logging you in..."));

      const res = await signInWithEmailAndPassword(
        firebaseAuth,
        newFormFields.email.trim(),
        newFormFields.password.trim()
      );

      _completedAuthorization(res);
    } catch (error) {
      errorHandler(error);
      dispatch(hideLoader());
    }
  };

  const _handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      dispatch(showLoader("Authenticating with Google..."));

      const res = await signInWithPopup(firebaseAuth, provider);

      _completedAuthorization(res);
    } catch (error) {
      errorHandler(error);
      dispatch(hideLoader());
    }
  };

  const _handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();

      dispatch(showLoader("Authenticating with Github..."));

      const res = await signInWithPopup(firebaseAuth, provider);

      _completedAuthorization(res);
    } catch (error) {
      errorHandler(error);
      dispatch(hideLoader());
    }
  };

  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title">Login</h2>

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

            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <label className="input-group">
                <span>
                  <RiLockPasswordLine />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full max-w-sm"
                  value={formFields.password}
                  onChange={(e) =>
                    _onChangeFormFields("password", e.target.value)
                  }
                  onBlur={() => _onBlurFormFields("password")}
                />

                <span
                  className="cursor-pointer"
                  onClick={() => setIsShowPassword((prev) => !prev)}
                >
                  {isShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </label>

              <label className="label">
                {errors?.password && (
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                )}
                <span className="label-text-alt ml-auto">
                  <Link className="link link-primary" to="/forgot-password">
                    Forgot Password?
                  </Link>
                </span>
              </label>
            </div>

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="card-actions justify-end">
            <div className="inline-flex items-center justify-center w-full">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar mx-2"
                onClick={_handleGoogleLogin}
              >
                <div className="w-10 rounded-full">
                  <FcGoogle className="w-full h-full" />
                </div>
              </label>

              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar mx-2"
                onClick={_handleGithubLogin}
              >
                <div className="w-10 rounded-full">
                  <AiFillGithub className="w-full h-full" />
                </div>
              </label>
            </div>
          </div>

          <div className="card-actions justify-end mt-4">
            Don't have an account?{" "}
            <Link className="link link-primary ml-1" to="/registration">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
