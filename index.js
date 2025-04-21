
import dotenv from 'dotenv';
import pkg from '@slack/bolt';
import OpenAI from 'openai';

dotenv.config();

const { App, ExpressReceiver } = pkg;

const MAX_CACHE_SIZE = 100;
const recentJokes = new Set();

const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

app.command('/joke', async ({ ack, respond, command }) => {
  await ack();

  const topic = command.text || 'programming';
  const prompt = `Tell me a ${topic} joke. Keep it short and funny`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const joke = completion.choices[0].message.content;
    await respond(`😂 *Here's your ${topic} joke:*\n\n${joke}`);
  } catch (error) {
    console.error(error);
    await respond("Oops! Couldn't fetch a joke right now");
  }
});

app.command('/joke-md', async ({ ack, respond, command }) => {
    await ack();
  
    const topic = command.text || 'programming';
    const prompt = `Tell me a ${topic} joke. Keep it short and funny`;
  
    const llmMdStyle = `<!-- llm: generate: "${prompt}" -->`;
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });
  
      const joke = completion.choices[0].message.content;
  
      if (recentJokes.has(joke)) {
        await respond(`🕵️ You've heard this one before! Try again`);
        return;
      }
  
      recentJokes.add(joke);
      if (recentJokes.size > MAX_CACHE_SIZE) {
        const [first] = recentJokes;
        recentJokes.delete(first);
      }
  
      await respond(`🧠 *Prompt (llm-md style)*\n\`\`\`markdown\n${llmMdStyle}\n\`\`\`\n\n🤣 *Joke:*\n${joke}`);
    } catch (error) {
      console.error(error);
      await respond("Oops! Couldn't fetch a joke just now");
    }
  });
  
receiver.app.listen(3000, () => {
  console.log('⚡️ JokeBot is running on http://localhost:3000');
});
