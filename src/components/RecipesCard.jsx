import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

import { addFavoriteRecipe } from "../redux/actions";
import CardLayout from "./CardLayout";

const RecipesCard = ({
  data,
  chef,
  isShowImageLeftSide = false,
  isShowImageRightSide = false,
}) => {
  const dispatch = useDispatch();

  const favoriteRecipes = useSelector((state) => state?.favoriteRecipes);

  const isFavorite = useMemo(() => {
    return favoriteRecipes?.recipes?.find((each) => each.id === data.id)
      ? true
      : false;
  }, [favoriteRecipes, data]);

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
              className="btn btn-ghost btn-circle"
              onClick={() =>
                !isFavorite
                  ? dispatch(addFavoriteRecipe({ recipe: { ...data, chef } }))
                  : {}
              }
            >
              {isFavorite ? (
                <AiTwotoneStar className="w-full h-full" />
              ) : (
                <AiOutlineStar className="w-full h-full" />
              )}
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
