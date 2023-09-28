import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeadingComponent = ({
  title,
  isShowDivider = false,
  isShowBackBtn = false,
  isShowActionBtn = false,
  actionBtnClassName = "",
  actionBtnText = "",
  actionBtnOnClick = () => {},
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

          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-extrabold">{title}</h2>

            {isShowActionBtn && (
              <button className={actionBtnClassName} onClick={actionBtnOnClick}>
                {actionBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadingComponent;
