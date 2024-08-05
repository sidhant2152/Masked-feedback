import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: process.env.PROMPT as string }],
      max_tokens: 400,
    });
    console.log("🚀 ~ POST ~ response:", response);
    const stream = OpenAIStream(response);
    console.log("🚀 ~ POST ~ OpenAIStream:", OpenAIStream);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    if (error instanceof OpenAI.APIError) {
      const { name, message, status, cause } = error;
      return Response.json(
        { success: false, name, message, status, cause },
        { status }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Something went wrong while suggesting messages",
        },
        { status: 500 }
      );
    }
  }
}
