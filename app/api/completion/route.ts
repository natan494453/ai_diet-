import { recipeSchema } from "@/constants/text";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  generateId,
  generateText,
  StreamData,
  streamText,
  streamObject,
} from "ai";
import { z } from "zod";
import { fetchMutation, fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import { use } from "react";
import { Token } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema: recipeSchema,
    prompt: body.recipe,
  });

  const user = await fetchQuery(api.tasks.user, {}, { token: body.token });
  console.log(user);
  await fetchMutation(api.tasks.addCount, {
    userId: user._id,
    count: user.count + 1,
  });
  // try {
  //   await fetchMutation(api.tasks.createRecipe, {
  //     title: (await result.object).title,
  //     instructions: (await result.object).instructions,
  //     ingredients: (await result.object).ingredients,
  //     cookTime: (await result.object).cookTime,
  //     isFavorite: false,
  //     prepTime: (await result.object).prepTime,
  //     servings: (await result.object).servings,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  return result.toTextStreamResponse();
}
