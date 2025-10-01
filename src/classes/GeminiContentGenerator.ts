import { GoogleGenAI } from "@google/genai";
import { ContentType } from "../types";

// ========================
// GEMINI CONTENT GENERATOR
// ========================
export class GeminiContentGenerator {
  private model: any;
  ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateRandomPost(): Promise<string> {
    console.log("Generating random post...");
    const prompts: string[] = [
      "Write a short, engaging tweet about an interesting fact. Max 280 characters.",
      "Create a thought-provoking tweet about technology or innovation. Max 280 characters.",
      "Write a motivational tweet that's inspiring but not cheesy. Max 280 characters.",
      "Create a fun tweet about everyday observations that people can relate to. Max 280 characters.",
      "Write a tweet sharing a cool life hack or productivity tip. Max 280 characters.",
      "Create a tweet with an interesting question that sparks conversation. Max 280 characters.",
    ];

    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    console.log("Using prompt:", prompt);
    const result = await this.ai.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash",
      contents: prompt,
    });
    const response = await result.text;
    let text = response || "".trim();

    console.log("Final text:", text);
    return text;
  }

  async generateTrendingPost() {
    console.log("Generating trending post...");
    const prompt = `Create a tweet about current trends in tech, AI, or internet culture. 
    Make it informative and engaging. Max 280 characters.`;
    console.log("Using prompt:", prompt);

    const result = await this.ai.models.generateContent({
      model: process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash",
      contents: prompt,
    });
    const response = await result.text;
    let text = response || "".trim();
    console.log("Final text:", text);

    return text;
  }

  async generateMixedPost(): Promise<string> {
    const postType = Math.random() > 0.5 ? "random" : "trending";
    return postType === "random"
      ? await this.generateRandomPost()
      : await this.generateTrendingPost();
  }

  async generatePost(
    contentType: ContentType = "mixed"
  ): Promise<string | null> {
    try {
      switch (contentType) {
        case "random":
          return await this.generateRandomPost();
        case "trending":
          return await this.generateTrendingPost();
        default:
          return await this.generateMixedPost();
      }
    } catch (error) {
      console.error("Error generating content:", error);
      return null;
    }
  }
}
