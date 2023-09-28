import { createSlice } from "@reduxjs/toolkit";
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
  removeAllFavoriteRecipes,
} from "../actions";

const initialState = {
  recipes: [],
};

const favoriteRecipesSlice = createSlice({
  name: "favoriteRecipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteRecipe, (state, action) => {
        const findRecipe = state.recipes.find(
          (each) => each.id === action.payload.recipe.id
        );
        if (!findRecipe) {
          state.recipes.push(action.payload.recipe);
        }
      })

      .addCase(removeFavoriteRecipe, (state, action) => {
        const findRecipeIndex = state.recipes.findIndex(
          (each) => each.id === action.payload.recipeId
        );
        if (findRecipeIndex >= 0) {
          state.recipes.splice(findRecipeIndex, 1);
        }
      })

      .addCase(removeAllFavoriteRecipes, (state, action) => {
        state.recipes = [];
      });
  },
});

export const favoriteRecipesReducer = favoriteRecipesSlice.reducer;
