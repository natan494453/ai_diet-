"use server";
import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { Id } from "../convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
export const deleteRecipeHandler = async (id: Id<"recipes">) => {
  try {
    await fetchMutation(api.tasks.deleteRecipe, { recipeId: id });
  } catch (error) {
    return NextResponse.error();
  }
};
