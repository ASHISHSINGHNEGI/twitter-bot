import "dotenv/config";
import { AutoTwitterBot } from "../classes/AutoTwitterBot";

async function main(): Promise<void> {
  const bot = new AutoTwitterBot();

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
