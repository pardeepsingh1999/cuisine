import React from "react";
import { useNavigate } from "react-router-dom";
import CardLayout from "./CardLayout";

const ChefCard = ({
  data,
  isShowImageLeftSide = false,
  isShowImageRightSide = false,
  isViewRecipes = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CardLayout>
        {isShowImageLeftSide && (
          <figure className="p-5 w-full sm:w-[800px] h-[300px] m-auto sm:m-0">
            <img
              src={data?.image_url}
              alt="thumbnail"
              className="rounded-xl w-full h-full"
            />
          </figure>
        )}

        <div className="card-body p-5">
          <h2 className="card-title">{data?.title}</h2>
          <p className="text-justify">{data?.content}</p>

          <ul className="list-none">
            <li>
              Years of experience:
              <span className="ml-1 font-semibold">
                {data?.yearsOfExperience}
              </span>
            </li>
            <li>
              Numbers of recipes:
              <span className="ml-1 font-semibold">{data?.recipes}</span>
            </li>
            <li>
              Likes:
              <span className="ml-1 font-semibold">{data?.likes}</span>
            </li>
          </ul>

          {!isViewRecipes && (
            <div className="card-actions justify-end mt-3">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/recipes/${data?.id}`)}
              >
                View Recipes
              </button>
            </div>
          )}
        </div>

        {isShowImageRightSide && (
          <figure className="p-5 w-full sm:w-[800px] h-[300px] m-auto sm:m-0">
            <img
              src={data?.image_url}
              alt="thumbnail"
              className="rounded-xl w-full h-full"
            />
          </figure>
        )}
      </CardLayout>
    </>
  );
};

export default ChefCard;
