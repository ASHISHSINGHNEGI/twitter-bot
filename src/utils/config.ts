import { BotConfig, ContentType } from "../types";

export const CONFIG: BotConfig = {
  contentType: (process.env.CONTENT_TYPE as ContentType) || "mixed",
  postInterval: parseInt(process.env.POST_INTERVAL || "3600000"),
};
