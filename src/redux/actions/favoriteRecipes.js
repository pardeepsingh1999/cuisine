import { createAction } from "@reduxjs/toolkit";

const addFavoriteRecipe = createAction("addFavoriteRecipe");
const removeFavoriteRecipe = createAction("removeFavoriteRecipe");
const removeAllFavoriteRecipes = createAction("removeAllFavoriteRecipes");

export { addFavoriteRecipe, removeFavoriteRecipe, removeAllFavoriteRecipes };
