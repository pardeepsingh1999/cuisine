import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { RegexConfig } from "../config/RegexConfig";
import { hideLoader, showLoader, updateUserData } from "../redux/actions";
import { errorHandler, showToast } from "../helpers";
import { firebaseAuth } from "../firebase";
import { uploadImageOnCloudinary } from "../http/http-call";
import { CLOUD_BUCKET_NAME, CLOUD_NAME } from "../config";

const Registration = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState({
    uploadData: null,
    type: "image",
    uploadUrl: null,
    preview: null,
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
            case "name": {
              if (newFormFields[key]?.trim().length) {
                newErrors[key] = null;
                newIsDirty[key] = false;
              } else {
                newErrors[key] = "*Required";
                isFormValid = false;
              }
              break;
            }
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

  const _onChangeFile = (e) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType !== "image") {
      showToast("Only image file is allowed", "error");
      return;
    }

    setAvatar({
      uploadData: file,
      preview: URL.createObjectURL(file),
      type: fileType,
      uploadUrl: null,
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

      dispatch(showLoader("Registration in progress..."));

      const newAvatar = { ...avatar };

      if (newAvatar?.uploadData) {
        const formData = new FormData();
        formData.append("file", newAvatar.uploadData);
        formData.append("upload_preset", CLOUD_BUCKET_NAME);
        formData.append("folder", CLOUD_BUCKET_NAME);
        formData.append("cloud_name", CLOUD_NAME);

        const uploadImageRes = await uploadImageOnCloudinary(formData);

        newAvatar.uploadUrl = uploadImageRes?.url?.toString();
        newAvatar.uploadData = null;
        setAvatar(newAvatar);
      }

      const res = await createUserWithEmailAndPassword(
        firebaseAuth,
        newFormFields.email.trim(),
        newFormFields.password.trim()
      );

      await updateProfile(res.user, {
        displayName: newFormFields.name?.trim(),
        photoURL: newAvatar?.uploadUrl,
      });

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
          <h2 className="card-title mb-2">Registration</h2>

          <div className="form-control relative">
            {avatar?.preview || avatar?.uploadUrl ? (
              <img
                className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                src={avatar?.preview || avatar?.uploadUrl}
                alt="avatar"
              />
            ) : (
              <AiOutlineUser className="w-20 h-20 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" />
            )}

            <label className="label cursor-pointer absolute -right-[10px] -bottom-[10px]">
              <input
                type="file"
                style={{ display: "none" }}
                value={""}
                accept="image/x-png,image/gif,image/jpeg"
                onChange={_onChangeFile}
              />
              <AiOutlineEdit />
            </label>
          </div>

          <form onSubmit={_onSubmitForm} className="contents">
            <div className="form-control w-full max-w-sm">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <label className="input-group">
                <span>
                  <AiOutlineUser />
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full max-w-sm"
                  value={formFields.name}
                  onChange={(e) => _onChangeFormFields("name", e.target.value)}
                  onBlur={() => _onBlurFormFields("name")}
                />
              </label>

              {errors?.name && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.name}
                  </span>
                </label>
              )}
            </div>

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
                Register
              </button>
            </div>
          </form>

          <div className="card-actions justify-end mt-4">
            <div className="mt-4">
              Already have an account?{" "}
              <Link className="link link-primary ml-1" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
