import React, { useMemo } from "react";
import HeadingComponent from "../components/HeadingComponent";
import { useParams } from "react-router-dom";
import CardLayout from "../components/CardLayout";
import RecipesCard from "../components/RecipesCard";
import { useSelector } from "react-redux";

const RecipeDetails = () => {
  const params = useParams();

  const favoriteRecipes = useSelector((state) => state?.favoriteRecipes);

  const recipe = useMemo(() => {
    return favoriteRecipes?.recipes?.find((each) => each.id === params.id);
  }, [favoriteRecipes, params?.id]);

  return (
    <>
      <HeadingComponent
        title={`${recipe?.title || "Recipe Details"}`}
        isShowBackBtn
      />

      {recipe ? (
        <>
          <RecipesCard data={recipe} chef={recipe.chef} isShowImageLeftSide />
        </>
      ) : (
        <CardLayout>
          <div className="card-body text-error text-center">
            Recipe not found!
          </div>
        </CardLayout>
      )}
    </>
  );
};

export default RecipeDetails;
