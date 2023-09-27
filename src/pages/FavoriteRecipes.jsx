import React from "react";
import CardLayout from "../components/CardLayout";
import HeadingComponent from "../components/HeadingComponent";

const MyFavoriteRecipes = () => {
  return (
    <>
      <HeadingComponent title="My Favorite Recipes" />

      <CardLayout>
        <p>My Favorite Recipes</p>
      </CardLayout>
    </>
  );
};

export default MyFavoriteRecipes;
