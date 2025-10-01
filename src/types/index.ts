// ========================
// TYPES & INTERFACES
// ========================

export interface BotConfig {
  contentType: "random" | "trending" | "mixed";
  postInterval: number;
}

export type ContentType = "random" | "trending" | "mixed";
