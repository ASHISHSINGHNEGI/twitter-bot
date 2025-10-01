import { TwitterApi } from "twitter-api-v2";

// ========================
// TWITTER BOT
// ========================
export class TwitterBot {
  private client: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_API_KEY!,
      appSecret: process.env.TWITTER_CONSUMER_API_SECRET!,
      accessToken: process.env.TWITTER_OAUTH_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_OAUTH_ACCESS_TOKEN_SECRET!,
    });
    console.log("Twitter client initialized", this.client);
  }
  async postTweet(content: string): Promise<boolean> {
    try {
      // Ensure content is within Twitter's character limit
      if (content.length > 280) {
        content = content.substring(0, 277) + "...";
      }
      // const readWriteClient = this.client.readWrite;

      const tweet = await this.client.v2.tweet(content);
      console.log("✅ Tweet posted successfully!");
      // console.log(`Tweet ID: ${tweet.data.id}`);
      console.log(`Content: ${content}`);
      return true;
    } catch (error) {
      console.error("❌ Error posting tweet:", error);
      return false;
    }
  }
}
