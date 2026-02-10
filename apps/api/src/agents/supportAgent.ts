import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function supportAgent(message: string, history: any[]) {
  // convert history to readable text
  const historyText = history
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are a CUSTOMER SUPPORT AGENT.

Conversation so far:
${historyText}

New user message:
${message}

Respond helpfully and politely.
Use previous context if needed.
`
  });

  return res.text;
}
