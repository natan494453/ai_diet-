import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import prisma from "@/db/connect";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// IMPORTANT! Set the runtime to edge

export async function POST(req: Request) {
  const { prompt, userMail, img, token, calories } = await req.json();
  console.log(prompt);
  console.log(calories);
  let recipe;
  if (calories === null) {
    recipe = `
    אם אתה לא רואה כאן: ${prompt} מרכיבים של האוכל או שאלה על אוכל אז תגיד שאתה לא יכול לענות!
    אחרת:
    אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
    בפורמט הבא:
    <h1>שם המתכון: שם המתכון</h1> 
    <br/>
    <br/>
    מרכיבים:
    <br/>
    מרכיב 1: מרכיב 1
    <br/>
    מרכיב 2: מרכיב 2
    <br/>
    <br/>
    הוראות הכנה:
    <br/>
    1. הוראות: ...
    <br/>
    2. הוראות: ... 
    הכל בעברית
    וב-HTML
    תוסיף שורה חדשה אחרי כל הוראה
    אני צריך כמויות מדויקות וגודל מנות
  `;
  } else {
    recipe = `  אם אתה לא רואה כאן: ${prompt} מרכיבים של האוכל או שאלה על אוכל אז תגיד שאתה לא יכול לענות!
    אחרת:
    אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
    בכל שלב תגיד לי כמה קלוריות יש שם
    ואל תעבור על ${calories}
    
    בפורמט הבא:
    <h1>שם המתכון: שם המתכון</h1> 
    <br/>
    <br/>
    מרכיבים:
    <br/>
    מרכיב 1: מרכיב 1
    <br/>
    מרכיב 2: מרכיב 2
    <br/>
    <br/>
    הוראות הכנה:
    <br/>
    1. הוראות: ...
    <br/>
    2. הוראות: ... 
    בסוף תכתוב לי כמה קלוריות יש במנה הכוללת
    וכמה פחמימות, חלבון ושומנים
    הכל בעברית
    וב-HTML
    תוסיף שורה חדשה אחרי כל הוראה
    תיכתוב כמה קלריות חלבון פיחממות ושומן יש בסוף
    אני צריך כמויות מדויקות וגודל מנות`;
  }

  console.log(recipe);
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: recipe }] }],
    });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response, {
    onCompletion: async (completion: string) => {
      const regex = /<h1>(.*?)<\/h1>/;
      const match = completion.match(regex);
      const recipeName = match ? match[1] : "error";
      const indexOf = completion.indexOf(":");
      const recippe = completion.substring(indexOf + 2, completion.length);
      const user = await fetchQuery(api.tasks.user, {}, { token: token });
      await fetchMutation(api.tasks.addCount, {
        userId: user._id,
        count: user.count + 1,
      });
      if (completion.length > 150) {
        await fetchMutation(
          api.tasks.createRecipe,
          {
            title: recipeName,
            recipe: recippe,
            isFavorite: false,
          },
          {
            token: token,
          }
        );
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
