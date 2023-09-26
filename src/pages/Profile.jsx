import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";

import { errorHandler, showToast } from "../helpers";
import {
  clearUserData,
  hideLoader,
  showLoader,
  updateOnlyUserData,
} from "../redux/actions";
import { CLOUD_BUCKET_NAME, CLOUD_NAME } from "../config";
import { uploadImageOnCloudinary } from "../http/http-call";
import { firebaseAuth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.userData);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
  });
  const [avatar, setAvatar] = useState({
    uploadData: null,
    type: "image",
    uploadUrl: null,
    preview: null,
  });
  const [isDirty, setIsDirty] = useState({});
  const [errors, setErrors] = useState({});

  const _setFormFields = () => {
    setFormFields({
      name: userData?.user?.displayName,
      email: userData?.user?.email,
    });
    setAvatar({
      uploadData: null,
      type: "image",
      uploadUrl: userData?.user?.photoURL,
      preview: null,
    });
    setIsDirty({});
    setErrors({});
  };

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

      dispatch(showLoader("Saving in progress..."));

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

      await updateProfile(userData?.user, {
        displayName: newFormFields.name?.trim(),
        photoURL: newAvatar?.uploadUrl,
      });

      dispatch(hideLoader());
    } catch (error) {
      errorHandler(error);
      dispatch(hideLoader());
    }
  };

  const _logout = () => {
    dispatch(clearUserData());
    navigate("/login");
  };

  useEffect(() => {
    _setFormFields();

    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log({ user });
        dispatch(updateOnlyUserData(user));
      } else {
        // User is signed out.
        _logout();
      }
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title mb-2">My Profile</h2>

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
                  disabled
                  readOnly
                />
              </label>
            </div>

            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
