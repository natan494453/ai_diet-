// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
// import { fetchMutation, fetchQuery } from "convex/nextjs";
// import { api } from "@/convex/_generated/api";

// // IMPORTANT! Set the runtime to edge

// export async function POST(req: Request) {
//   const { prompt, userMail, img, token, calories } = await req.json();
//   let recipe;
//   if (calories === null) {
//     recipe = `
//     אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
//     בפורמט הבא:
//     <h1>שם המתכון: שם המתכון</h1>
//     <br/>
//     <br/>
//     מרכיבים:
//     <br/>
//     מרכיב 1: מרכיב 1
//     <br/>
//     מרכיב 2: מרכיב 2
//     <br/>
//     <br/>
//     הוראות הכנה:
//     <br/>
//     1. הוראות: ...
//     <br/>
//     2. הוראות: ...
//     הכל בעברית
//     וב-HTML
//     תוסיף שורה חדשה אחרי כל הוראה
//     אני צריך כמויות מדויקות וגודל מנות
//   `;
//   } else {
//     recipe = `
//     אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
//     בכל שלב תגיד לי כמה קלוריות יש שם
//     עם בדיוק ${calories} קלוריות! חשוב מאוד!

//     בפורמט הבא:
//     <h1>שם המתכון: שם המתכון</h1>
//     <br/>
//     <br/>
//     מרכיבים:
//     <br/>
//     מרכיב 1: מרכיב 1
//     <br/>
//     מרכיב 2: מרכיב 2
//     <br/>
//     <br/>
//     הוראות הכנה:
//     <br/>
//     1. הוראות: ...
//     <br/>
//     2. הוראות: ...
//     בסוף תכתוב לי כמה קלוריות יש במנה הכוללת
//     וכמה פחמימות, חלבון ושומנים
//     הכל בעברית
//     וב-HTML
//     תוסיף שורה חדשה אחרי כל הוראה
//     תיכתוב כמה קלריות חלבון פיחממות ושומן יש בסוף
//     אני צריך כמויות מדויקות וגודל מנות`;
//   }

//   // Ask Google Generative AI for a streaming completion given the prompt
//   const response = await genAI
//     .getGenerativeModel({ model: "gemini-pro" })
//     .generateContentStream({
//       contents: [{ role: "user", parts: [{ text: recipe }] }],
//     });

//   // Convert the response into a friendly tex-stream

//   const stream = GoogleGenerativeAIStream(response, {
//     onCompletion: async (completion: string) => {
//       const regex = /<h1>(.*?)<\/h1>/;
//       const match = completion.match(regex);
//       const recipeName = match ? match[1] : "error";
//       const indexOf = completion.indexOf(":");
//       const recippe = completion.substring(indexOf + 2, completion.length);
//       const user = await fetchQuery(api.tasks.user, {}, { token: token });
//       await fetchMutation(api.tasks.addCount, {
//         userId: user._id,
//         count: user.count + 1,
//       });
//       if (completion.length > 150) {
//         await fetchMutation(
//           api.tasks.createRecipe,
//           {
//             title: recipeName,
//             recipe: recippe,
//             isFavorite: false,
//           },
//           {
//             token: token,
//           }
//         );
//       }
//     },
//   });

//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }
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
  // const { prompt, userMail, img, token, calories, context } = await req.json();
  // console.log(context);
  const test = await req.json();
  let recipe;
  // if (calories === null) {
  //   recipe = `
  //     אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
  //     בפורמט הבא:
  //     <h1>שם המתכון: שם המתכון</h1>
  //     <br/>
  //     <br/>
  //     מרכיבים:
  //     <br/>
  //     מרכיב 1: מרכיב 1
  //     <br/>
  //     מרכיב 2: מרכיב 2
  //     <br/>
  //     <br/>
  //     הוראות הכנה:
  //     <br/>
  //     1. הוראות: ...
  //     <br/>
  //     2. הוראות: ...
  //     הכל בעברית
  //     וב-HTML
  //     תוסיף שורה חדשה אחרי כל הוראה
  //     אני צריך כמויות מדויקות וגודל מנות
  //   `;
  // } else {
  //   recipe = `
  //     אני צריך שתכתוב מתכון עם המרכיבים האלו ${prompt} או תענה על השאלה
  //     בכל שלב תגיד לי כמה קלוריות יש שם
  //     עם בדיוק ${calories} קלוריות! חשוב מאוד!

  //     בפורמט הבא:
  //     <h1>שם המתכון: שם המתכון</h1>
  //     <br/>
  //     <br/>
  //     מרכיבים:
  //     <br/>
  //     מרכיב 1: מרכיב 1
  //     <br/>
  //     מרכיב 2: מרכיב 2
  //     <br/>
  //     <br/>
  //     הוראות הכנה:
  //     <br/>
  //     1. הוראות: ...
  //     <br/>
  //     2. הוראות: ...
  //     בסוף תכתוב לי כמה קלוריות יש במנה הכוללת
  //     וכמה פחמימות, חלבון ושומנים
  //     הכל בעברית
  //     וב-HTML
  //     תוסיף שורה חדשה אחרי כל הוראה
  //     תיכתוב כמה קלריות חלבון פיחממות ושומן יש בסוף
  //     אני צריך כמויות מדויקות וגודל מנות`;
  // }

  // console.log(context);
  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const result = await streamObject({
    model: google("gemini-1.5-flash"),
    schema: recipeSchema,
    prompt: test.recipe,
  });
  // try {
  //   if (!user || !test.token) {
  //     return NextResponse.json({ error: "You must log in", status: 401 });
  //   } else {
  //     // await fetchMutation(api.tasks.createRecipe, {
  //     //   title: (await result.object).title,
  //     //   isFavorite: false,
  //     //   recipe: (await result.object).instructions[0],
  //     // });
  //   }
  // } catch (error) {
  //   return NextResponse.json({ error: error });
  // }
  const user = await fetchQuery(api.tasks.user, {}, { token: test.token });
  console.log(user);
  await fetchMutation(api.tasks.addCount, {
    userId: user._id,
    count: user.count + 1,
  });
  return result.toTextStreamResponse();
}
