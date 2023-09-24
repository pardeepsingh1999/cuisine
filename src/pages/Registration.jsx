import React from "react";
import {
  //useNavigate,
  Link,
} from "react-router-dom";
import {
  AiOutlineMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";

const Registration = () => {
  // const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title mb-2">Registration</h2>

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
              />
              <span
                className="cursor-pointer"
                onClick={() => setIsShowPassword((prev) => !prev)}
              >
                {isShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </label>

            <label className="label">
              <span className="label-text-alt text-error">
                Bottom Left label
              </span>
              <span className="label-text-alt">
                <Link className="link link-primary" to="/forgot-password">
                  Forgot Password?
                </Link>
              </span>
            </label>
          </div>

          <div className="card-actions justify-end mt-4">
            <div>
              <button className="btn btn-primary">Register</button>

              <div className="mt-4">
                Already have an account?{" "}
                <Link className="link link-primary ml-1" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
