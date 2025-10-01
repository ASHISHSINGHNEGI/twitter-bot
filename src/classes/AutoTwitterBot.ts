import { GeminiContentGenerator } from "../classes/GeminiContentGenerator";
import { TwitterBot } from "../classes/TwitterBot";
import { ContentType } from "../types";
import { CONFIG } from "../utils/config";

export class AutoTwitterBot {
  private generator: GeminiContentGenerator;
  private twitter: TwitterBot;
  private tweetCount: number = 0;

  constructor() {
    this.generator = new GeminiContentGenerator(process.env.GEMINI_API_KEY!);
    this.twitter = new TwitterBot();
  }

  async postOnce(): Promise<void> {
    console.log("\n" + "=".repeat(50));
    console.log(
      `Generating post #${this.tweetCount + 1} at ${new Date().toISOString()}`
    );
    console.log(`Content type: ${CONFIG.contentType}`);

    // Generate content
    const content = await this.generator.generatePost(CONFIG.contentType);
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

  async runContinuous(): Promise<void> {
    console.log("🤖 Auto Twitter Bot Started!");
    console.log(`Content Type: ${CONFIG.contentType}`);
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
