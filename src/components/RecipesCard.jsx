import React from "react";
import { useNavigate } from "react-router-dom";
import CardLayout from "./CardLayout";

const RecipesCard = ({
  data,
  isShowImageLeftSide = false,
  isShowImageRightSide = false,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <CardLayout>
        {isShowImageLeftSide && (
          <figure className="p-5 w-full sm:w-[500px] h-[300px] m-auto sm:m-0">
            <img
              src={data?.image_url}
              alt="thumbnail"
              className="rounded-xl w-full h-full"
            />
          </figure>
        )}

        <div className="card-body p-5">
          <h2 className="card-title">{data?.title}</h2>

          <h4 className="font-semibold">Ingredients</h4>
          <ul className="list-disc px-5">
            {data?.ingredients?.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </ul>

          <h4 className="font-semibold">Cooking Method</h4>
          <ul className="list-disc px-5">
            {data?.cooking_method?.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </ul>

          <div className="card-actions justify-end mt-3">
            <p>
              Rating: <b>{data?.rating}</b>
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/recipes/${data?.id}`)}
            >
              Make Favorite
            </button>
          </div>
        </div>

        {isShowImageRightSide && (
          <figure className="p-5 w-full sm:w-[500px] h-[300px] m-auto sm:m-0">
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

export default RecipesCard;
