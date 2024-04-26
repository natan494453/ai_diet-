import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import prisma from "@/db/connect";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// IMPORTANT! Set the runtime to edge

export async function POST(req: Request) {
  const { prompt, userMail } = await req.json();
  //test
  const recipe = `
    if you dont see here : [${prompt}] food ingredients or a question about fooג so you will say that you cant answer!
    else:
    i need you to write a recipe with this ingredients ${prompt}
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
    1. instructions 1
    <br/>
    2. instructions  2 
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

      if (completion.length > 150) {
        const recipe = await prisma.recipe.create({
          data: {
            title: recipeName,
            userId: userMail,
            recipe: recippe,
            isFavorite: false,
          },
        });
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
