# 🤖 Slack JokeBot (Powered by llm-md Prompt Style 💅🏻)

This is a fun Slack bot that responds to `/joke` commands with fresh AI-generated jokes using GPT-4.

Built in ~1 hour to experiment with [`llm-md`](https://codeberg.org/anuna/llm-md) — a markdown-based DSL for LLM workflows — this project borrows its prompt style and wraps it into a playful bot experience.

---

## 🚀 Features

- 🔁 Slash command `/joke` for random jokes
- 🧠 GPT-4 powered responses
- 💬 `/joke-md` command displays the `llm-md` style prompt + the generated joke
- 🧹 In-memory joke caching to avoid repeats

---

## 🧠 llm-md Prompt Style

While we don’t use the `llm-md` CLI directly, this bot mimics its prompt philosophy.

Example:
```markdown
<!-- llm: generate: "Tell me a dad joke" -->

Results in:

Why did the computer go to therapy?
It had too many tabs open.
```

## 🛠 Tech Stack
- Node.js
- Slack Bolt SDK
- OpenAI SDK (v4)
- Markdown-inspired prompt templating (llm-md-style)

## 🧪 Try it locally
⚠️ This assumes you’re testing in a Slack workspace you control

1. Clone this repo

2. Install dependencies

3. Create a `.env` file
```
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_SIGNING_SECRET=your-signing-secret
OPENAI_API_KEY=your-openai-key
```

4. Run the app
```
node index.js
```

5. Expose it with ngrok
```
npx ngrok http 3000
```

6. Register Slack Slash Commands
Add these to your Slack app:

| Command    | Description             | Request URL                        |
|------------|-------------------------|------------------------------------|
| `/joke`    | Returns a GPT-4 joke    | `https://<your-ngrok-url>/slack/events` |
| `/joke-md` | Shows prompt + joke     | `https://<your-ngrok-url>/slack/events` |

Replace <your-ngrok-url> with your actual ngrok HTTPS URL when you're ready to go live.

## 💡 Inspiration
This project was inspired by [llm-md](https://llm.md/).

Check it out if you’re curious about markdown-based prompt engineering! 🤓

## 📸 Screenshots

| Command     | Output Preview                  |
|-------------|----------------------------------|
| `/joke`     | ![Joke command](./screenshots/Screenshot%202025-04-21%20at%205.22.57 pm.png) |
| `/joke-md`  | ![Joke-md command](./screenshots/Screenshot%202025-04-21%20at%205.23.03 pm.png) |

## 🧵 Built by
[EllaFerreira](www.linkedin.com/in/ella-ferreira-3959aa82)

Community Organizer · Software Engineer · AI Curious

