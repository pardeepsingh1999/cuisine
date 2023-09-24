import React from "react";
import { AiOutlineMail, AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title mb-2">My Profile</h2>

          <div className="form-control">
            <figure className="relative">
              <div className="w-20 rounded-full">
                <RxAvatar className="w-full h-full" />
                {/* <img src={APP_LOGO} alt="logo" /> */}
              </div>

              <label className="label cursor-pointer absolute -right-1 bottom-0">
                <input
                  type="file"
                  style={{ display: "none" }}
                  value={""}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <AiOutlineEdit />
              </label>
            </figure>
          </div>

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
              />
            </label>

            <label className="label">
              <span className="label-text-alt text-error">
                Bottom Left label
              </span>
            </label>
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
                disabled
                readOnly
              />
            </label>
          </div>

          <div className="card-actions justify-end mt-4">
            <div>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
