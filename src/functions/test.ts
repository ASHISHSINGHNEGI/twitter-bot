import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

const response = await ai.models.generateContentStream({
  model: "gemini-2.0-flash",
  contents: "Write a story about a magic backpack.",
});
let text = "";
for await (const chunk of response) {
  console.log(chunk.text);
  text += chunk.text;
}
