"use server";

import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
export interface recipeTypes {
  title: string;
  ingredients: [{ name: string; quantity: string }];
  instructions: [string];
  prepTime: string;
  cookTime: string;
  servings: number;
}
export const addRecipeHandler = async (
  recipe: recipeTypes,
  token: string | undefined
) => {
  if (!token) return NextResponse.json({ msg: "No Token", status: 401 });
  await fetchMutation(
    api.tasks.createRecipe,
    {
      title: recipe.title,
      ingredients: recipe.ingredients,
      cookTime: recipe.cookTime,
      instructions: recipe.instructions,
      isFavorite: false,
      prepTime: recipe.prepTime,
      servings: recipe.servings,
    },
    {
      token: token,
    }
  );
  return NextResponse.json({ msg: "hello" });
};
