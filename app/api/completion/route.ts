import { recipeSchemaEnglish, recipe_schema_hebrew } from "@/constants/text";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamObject } from "ai";

import { fetchMutation, fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body.calories);
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });
  const recipe_schema_hebrew_with_calories = z.object({
    title: z.string().describe(" שם המתכון"),
    ingredients: z
      .array(
        z.object({
          name: z.string().describe(" שם המרכיב"),
          quantity: z
            .string()
            .describe(" כמות המרכיב, למשל '1 כוס' או '2 כפות'"),
        })
      )
      .describe(
        ` רשימת מרכיבים עם כמויות כך שהסך הכולל של הקלוריות יעמוד **בדיוק** על ${body.calories ? body.calories : "מספר קלריות במנה"} קלוריות 🍽️`
      ),
    instructions: z
      .array(z.string())
      .describe("📝 הוראות הכנה: שלב-אחר-שלב בצורה ברורה וקלה להבנה"),
    prepTime: z.string().describe("⏱️ זמן הכנה, למשל '15 דקות' ⏳"),
    cookTime: z.string().describe("🔥 זמן בישול, למשל '30 דקות' 🍳"),
    servings: z.number().describe("🍽️ מספר מנות המתכון מספיק לכמה אנשים?"),
    calories: z
      .number()
      .describe(
        `🔢 סך הכל מספר קלוריות **חייב להיות בדיוק שווה ל-${body.calories} קלוריות**`
      ),
    carbs: z.number().describe(" סך הכל מספר הפחמימות במנה (גרם)"),
    protein: z.number().describe("סך הכל מספר החלבונים במנה (גרם)"),
    fats: z.number().describe(" סך הכל מספר השומנים במנה (גרם)"),
  });

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema:
      body.locale === "he"
        ? recipe_schema_hebrew_with_calories
        : recipeSchemaEnglish,
    prompt: body.recipe,
  });

  const user = await fetchQuery(api.tasks.user, {}, { token: body.token });

  await fetchMutation(api.tasks.addCount, {
    userId: user._id,
    count: user.count + 1,
  });

  return result.toTextStreamResponse();
}
