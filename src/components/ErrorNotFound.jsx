import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const ErrorNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log("redirect to home");
      navigate("/");
    }, 5000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card max-w-sm bg-base-100 shadow-xl text-error mx-auto">
        <figure className="px-10 pt-10">
          <TbError404 className="h-40 w-40" />
        </figure>

        <div className="card-body items-center text-center pt-0">
          <h2 className="card-title mb-3">Page not found!</h2>

          <div className="card-actions mt-3">
            <button className="btn btn-error" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorNotFound;
