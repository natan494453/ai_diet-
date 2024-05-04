import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import prisma from "@/db/connect";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

// IMPORTANT! Set the runtime to edge

export async function POST(req: Request) {
  const { prompt, userMail, img } = await req.json();

  const recipe = `
    if you dont see here : [${prompt}] food ingredients or a question about food so you will say that you cant answer!
    else:
    i need you to write a recipe with this ingredients ${prompt} or answer the question
    in this format:
    <h1>recipe name : recipe name</h1> 
    <br/>
    <br/>
    ingredients :
    <br/>
    ingredient 1: ingredient 1
    <br/>
    ingredient 2: ingredient 2
    <br/>
    <br/>
    instructions :
    <br/>
    1. instructions : ...
    <br/>
    2. instructions  : ... 
    all in hebrew
    and in html
    i need exact measurements and portion sizes
  `;
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
      const user = await fetchQuery(api.tasks.getuser, { userId: userMail });
      await fetchMutation(api.tasks.addCount, {
        userId: user[0]._id,
        count: user[0].count + 1,
      });
      if (completion.length > 150) {
        await fetchMutation(api.tasks.createRecipe, {
          userImg: img,
          title: recipeName,
          userId: userMail,
          recipe: recippe,
          isFavorite: false,
        });
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
