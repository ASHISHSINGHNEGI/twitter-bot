// bot.js - Main Twitter Bot Script
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";

// ========================
// CONFIGURATION
// ========================

const CONFIG = {
  contentType: process.env.CONTENT_TYPE || "mixed", // 'random', 'trending', or 'mixed'
  postInterval: parseInt(process.env.POST_INTERVAL) || 3600000, // milliseconds (default: 1 hour)
};

// ========================
// GEMINI CONTENT GENERATOR
// ========================

class GeminiContentGenerator {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateRandomPost() {
    const prompts = [
      "Write a short, engaging tweet about an interesting fact (max 280 characters)",
      "Create a thought-provoking tweet about technology or innovation (max 280 characters)",
      "Write a motivational tweet that's inspiring but not cheesy (max 280 characters)",
      "Create a fun tweet about everyday observations that people can relate to (max 280 characters)",
      "Write a tweet sharing a cool life hack or productivity tip (max 280 characters)",
      "Create a tweet with an interesting question that sparks conversation (max 280 characters)",
    ];

    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  async generateTrendingPost() {
    const prompt = `Create a tweet about current trends in tech, AI, or internet culture.
    Make it informative and engaging. Max 280 characters. Don't use hashtags excessively.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  }

  async generateMixedPost() {
    const postType = Math.random() > 0.5 ? "random" : "trending";
    return postType === "random"
      ? await this.generateRandomPost()
      : await this.generateTrendingPost();
  }

  async generatePost(contentType = "mixed") {
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

// ========================
// TWITTER BOT
// ========================

class TwitterBot {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    this.twitterClient = this.client.readWrite;
  }

  async postTweet(content) {
    try {
      // Ensure content is within Twitter's character limit
      if (content.length > 280) {
        content = content.substring(0, 277) + "...";
      }

      const tweet = await this.twitterClient.v2.tweet(content);
      console.log("✅ Tweet posted successfully!");
      console.log(`Tweet ID: ${tweet.data.id}`);
      console.log(`Content: ${content}`);
      return true;
    } catch (error) {
      console.error("❌ Error posting tweet:", error);
      return false;
    }
  }
}

// ========================
// MAIN BOT CONTROLLER
// ========================

class AutoTwitterBot {
  constructor(contentType = "mixed") {
    this.generator = new GeminiContentGenerator(process.env.GEMINI_API_KEY);
    this.twitter = new TwitterBot();
    this.contentType = contentType;
    this.tweetCount = 0;
  }

  async postOnce() {
    console.log("\n" + "=".repeat(50));
    console.log(
      `Generating post #${this.tweetCount + 1} at ${new Date().toISOString()}`,
    );
    console.log(`Content type: ${this.contentType}`);

    // Generate content
    const content = await this.generator.generatePost(this.contentType);

    if (content) {
      // Post to Twitter
      const success = await this.twitter.postTweet(content);
      if (success) {
        this.tweetCount++;
      }
    } else {
      console.log("Failed to generate content");
    }
  }

  async runContinuous() {
    console.log("🤖 Auto Twitter Bot Started!");
    console.log(`Content Type: ${this.contentType}`);
    console.log(`Posting interval: ${CONFIG.postInterval / 1000} seconds`);
    console.log("=".repeat(50) + "\n");

    // Post immediately on start
    await this.postOnce();

    // Then post on interval
    setInterval(async () => {
      try {
        await this.postOnce();
      } catch (error) {
        console.error("❌ Unexpected error:", error);
      }
    }, CONFIG.postInterval);
  }
}

// ========================
// RUN THE BOT
// ========================

async function main() {
  const bot = new AutoTwitterBot(CONFIG.contentType);

  // For GitHub Actions or one-time run
  if (process.env.RUN_ONCE === "true") {
    await bot.postOnce();
    process.exit(0);
  } else {
    // For continuous running
    await bot.runContinuous();
  }
}

main().catch(console.error);
