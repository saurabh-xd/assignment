import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function supportAgent(message: string) {
  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are a helpful customer support assistant.

User message:
${message}

Respond helpfully and politely.
`
  });

  return res.text;
}
