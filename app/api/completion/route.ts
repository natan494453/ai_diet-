import { recipeSchemaEnglish } from "@/constants/text";
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
    prepTime: z.string().describe(" זמן הכנה, למשל '15 דקות'"),
    cookTime: z.string().describe(" זמן בישול, למשל'30 דקות "),
    servings: z.number().describe(" מספר מנות המתכון מספיק לכמה אנשים?"),
    calories: z
      .number()
      .describe(
        ` סך הכל מספר קלוריות **חייב להיות בדיוק שווה ל-${body.calories} קלוריות**`
      ),
    carbs: z.number().describe(" סך הכל מספר הפחמימות במנה (גרם)"),
    protein: z.number().describe("סך הכל מספר החלבונים במנה (גרם)"),
    fats: z.number().describe(" סך הכל מספר השומנים במנה (גרם)"),
  });
  const recipe_schema_english_with_calories = z.object({
    title: z.string().describe("The recipe name"),
    ingredients: z
      .array(
        z.object({
          name: z.string().describe("The name of the ingredient"),
          quantity: z
            .string()
            .describe(
              "The quantity of the ingredient, e.g., '1 cup' or '2 tablespoons'"
            ),
        })
      )
      .describe(
        `A list of ingredients with quantities such that the total calorie count is **exactly** ${
          body.calories ? body.calories : "the number of calories per serving"
        } calories 🍽️`
      ),
    instructions: z
      .array(z.string())
      .describe(
        "📝 Preparation steps: step-by-step instructions that are clear and easy to follow"
      ),
    prepTime: z.string().describe("Preparation time, e.g., '15 minutes'"),
    cookTime: z.string().describe("Cooking time, e.g., '30 minutes'"),
    servings: z.number().describe("The number of servings the recipe yields"),
    calories: z
      .number()
      .describe(
        `The total number of calories **must be exactly equal to ${body.calories ? body.calories : "total calories"} calories**`
      ),
    carbs: z
      .number()
      .describe("The total amount of carbohydrates in the dish (grams)"),
    protein: z
      .number()
      .describe("The total amount of protein in the dish (grams)"),
    fats: z.number().describe("The total amount of fats in the dish (grams)"),
  });

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema:
      body.locale === "he"
        ? recipe_schema_hebrew_with_calories
        : recipe_schema_english_with_calories,
    prompt: body.recipe,
  });

  const user = await fetchQuery(api.tasks.user, {}, { token: body.token });

  await fetchMutation(api.tasks.addCount, {
    userId: user._id,
    count: user.count + 1,
  });

  return result.toTextStreamResponse();
}
