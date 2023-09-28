import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardLayout from "../components/CardLayout";
import HeadingComponent from "../components/HeadingComponent";
import {
  removeAllFavoriteRecipes,
  removeFavoriteRecipe,
} from "../redux/actions";

const FavoriteRecipes = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favoriteRecipes = useSelector((state) => state?.favoriteRecipes);

  return (
    <>
      <HeadingComponent
        title="My Favorite Recipes"
        isShowActionBtn={favoriteRecipes?.recipes?.length ? true : false}
        actionBtnClassName="btn btn-ghost text-error btn-xs"
        actionBtnText="Remove All"
        actionBtnOnClick={() => dispatch(removeAllFavoriteRecipes())}
      />

      <CardLayout>
        <div className="card-body p-5">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Recipe</th>
                  <th>Chef</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {favoriteRecipes?.recipes?.length ? (
                  favoriteRecipes.recipes.map((each) => (
                    <tr key={each.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={each.image_url}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{each.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={each.chef?.image_url}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{each.chef?.title}</div>
                          </div>
                        </div>
                      </td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() => navigate(`/recipe/${each.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-ghost text-error btn-xs"
                          onClick={() =>
                            dispatch(
                              removeFavoriteRecipe({ recipeId: each.id })
                            )
                          }
                        >
                          Remove
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td colSpan={3}>There is no data to display.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardLayout>
    </>
  );
};

export default FavoriteRecipes;
