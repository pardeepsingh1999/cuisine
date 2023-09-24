import React from "react";
import {
  //useNavigate,
  Link,
} from "react-router-dom";
import {
  AiOutlineMail,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const Login = () => {
  // const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <>
      <div className="card max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body items-center text-center pt-4">
          <h2 className="card-title">Login</h2>

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
              <button className="btn btn-primary">Login</button>

              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-64 h-px my-8 bg-gray-700 border-0" />
                <span class="absolute px-3 bg-gray-700 text-white font-medium">
                  OR
                </span>
              </div>

              <div>
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar mx-2"
                >
                  <div className="w-10 rounded-full">
                    <FcGoogle className="w-full h-full" />
                  </div>
                </label>
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar mx-2"
                >
                  <div className="w-10 rounded-full">
                    <AiFillGithub className="w-full h-full" />
                  </div>
                </label>
              </div>

              <div className="mt-4">
                Don't have an account?{" "}
                <Link className="link link-primary ml-1" to="/registration">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
