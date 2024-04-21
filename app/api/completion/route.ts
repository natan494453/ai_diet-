import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// IMPORTANT! Set the runtime to edge

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  //test
  const recipe = `
    if you dont see here : [${prompt}] food ingredients so you will say that you can answer!
    else:
    i need you to write a recipe with this ingredients ${prompt}
    in this format:
    <h1>recipe name : pancakes</h1> 
    <br/>
    <br/>
    ingredients :
    <br/>
    ingredient 1: eggs
    <br/>
    ingredient 2: eggs
    <br/>
    <br/>
    instructions :
    <br/>
    1. instructions 1
    <br/>
    2. instructions  2 
    all in hebrew
    and in html
  `;
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [{ role: "user", parts: [{ text: recipe }] }],
    });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
