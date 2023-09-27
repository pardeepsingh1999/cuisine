import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeadingComponent = ({
  title,
  isShowDivider = false,
  isShowBackBtn = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="max-w-sm sm:max-w-xl md:max-w-4xl bg-base-100 mx-auto mb-2">
        {isShowDivider && <div className="divider" />}

        <div className="flex items-center">
          {isShowBackBtn && (
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
            </button>
          )}

          <h2 className="text-2xl font-extrabold">{title}</h2>
        </div>
      </div>
    </>
  );
};

export default HeadingComponent;
