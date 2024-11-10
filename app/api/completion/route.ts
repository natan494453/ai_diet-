import { recipeSchemaEnglish, recipeSchemaHebrew } from "@/constants/text";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject } from "ai";

import { fetchMutation, fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";

export async function POST(req: Request) {
  const body = await req.json();
  body.locale;
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema: body.locale === "he" ? recipeSchemaHebrew : recipeSchemaEnglish,
    prompt: body.recipe,
  });

  const user = await fetchQuery(api.tasks.user, {}, { token: body.token });

  await fetchMutation(api.tasks.addCount, {
    userId: user._id,
    count: user.count + 1,
  });

  return result.toTextStreamResponse();
}
