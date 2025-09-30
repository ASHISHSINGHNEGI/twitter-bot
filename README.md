🤖 Automated Twitter Bot with Gemini API
A free, automated Twitter bot that generates and posts content using Google's Gemini AI. Runs completely free on GitHub Actions with Bun runtime for blazing-fast performance!

🚀 Features
✅ Generates unique AI content using Gemini API
✅ Posts automatically to Twitter/X
✅ Three content modes: random, trending, or mixed
✅ Completely FREE (runs on GitHub Actions)
✅ Lightning fast with Bun runtime (3x faster than Node.js)
✅ Customizable posting schedule
✅ Zero server maintenance
📋 Prerequisites
GitHub Account (free)
Twitter Developer Account (free)
Google AI Studio Account (free)
Bun (for local testing) - Install Bun
🔧 Setup Instructions
Step 1: Get API Keys
A. Gemini API Key
Go to Google AI Studio
Click "Create API Key"
Copy your API key
B. Twitter API Keys
Go to Twitter Developer Portal
Create a new app (or use existing)
Go to "Keys and Tokens" tab
Generate/copy these 4 keys:
API Key
API Secret
Access Token
Access Token Secret
Important: Set app permissions to "Read and Write"
Step 2: Setup GitHub Repository
Create a new GitHub repository
bash
git clone <your-repo-url>
cd <your-repo-name>
Add project files
Create bot.ts (main bot code - TypeScript!)
Create package.json
Create tsconfig.json (TypeScript config)
Create .github/workflows/post-tweet.yml
Create .env for local testing (don't commit this!)
Install dependencies (for local testing)
bash
bun install
bun add -d @types/node bun-types
Note: Bun has built-in TypeScript support - no compilation needed! Just run .ts files directly.

Step 3: Configure GitHub Secrets
Go to your GitHub repository
Click Settings → Secrets and variables → Actions
Click New repository secret and add these:
Secret Name Value
GEMINI_API_KEY Your Gemini API key
TWITTER_API_KEY Your Twitter API key
TWITTER_API_SECRET Your Twitter API secret
TWITTER_ACCESS_TOKEN Your Twitter access token
TWITTER_ACCESS_TOKEN_SECRET Your Twitter access token secret
CONTENT_TYPE mixed (or random/trending)
Step 4: Push to GitHub
bash
git add .
git commit -m "Initial bot setup"
git push origin main
Step 5: Enable GitHub Actions
Go to your repo's Actions tab
Enable workflows if prompted
The bot will now run automatically based on your schedule!
⏰ Customizing Post Schedule
Edit .github/workflows/post-tweet.yml:

yaml
on:
schedule: - cron: '0 \* \* \* \*' # Change this line
Common schedules:

'0 \* \* \* _' - Every hour
'0 _/2 \* \* _' - Every 2 hours
'0 _/6 \* \* _' - Every 6 hours (4 times/day)
'0 9,15,21 _ \* _' - At 9am, 3pm, and 9pm
'0 0 _ \* \*' - Once a day at midnight
Use Crontab Guru to create custom schedules.

🎮 Content Types
Change CONTENT_TYPE secret in GitHub to:

random - Fun facts, tips, motivational quotes, interesting observations
trending - Tech trends, AI news, internet culture
mixed - Randomly alternates between both
🧪 Local Testing
Install Bun (if you haven't):
bash
curl -fsSL https://bun.sh/install | bash
Create .env file:
bash
cp .env.example .env
Add your API keys to .env
Test the bot:
bash

# Post once

bun run post

# Run continuously (posts every interval)

bun start
Why Bun?

⚡ 3x faster than Node.js
🚀 Faster package installs
💪 Drop-in replacement (same code works)
🔥 Better developer experience
🎯 Native TypeScript support (no tsc needed!)
🔍 Monitoring
Check Actions tab in GitHub to see run history
Each run shows logs of what was posted
Green checkmark = successful post
Red X = error (check logs)
🛠️ Troubleshooting
Bot not posting?
Check GitHub Actions logs for errors
Verify all secrets are set correctly
Ensure Twitter app has "Read and Write" permissions
Rate limits?
GitHub Actions: 2,000 free minutes/month (plenty for this)
Twitter: Max 300 tweets per 3 hours (you'll never hit this with hourly posts)
Gemini: 60 requests per minute (way more than needed)
Want to test immediately?
Go to Actions tab
Select "Auto Tweet Bot" workflow
Click "Run workflow" → "Run workflow"
💰 Cost Breakdown
Service Cost
GitHub Actions FREE (2,000 min/month)
Gemini API FREE (60 req/min)
Twitter API FREE (Basic tier)
Total $0/month ✅
📝 Tips
Start with less frequent posts (every 6 hours) to test
Monitor engagement to optimize content type
Use the manual trigger to test before going live
Keep an eye on API rate limits
🤝 Contributing
Feel free to fork and customize for your needs!

📄 License
MIT

Happy Automating! 🚀
