import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export type Intent = "support" | "order" | "billing";

export async function routerAgent(message: string): Promise<Intent> {
  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are a router for a customer support system.

Classify the user's message into one of these categories:
- support (general questions, help)
- order (order status, tracking, cancel)
- billing (payment, refund, invoice)

Only respond with ONE word:
support
order
billing

Message: ${message}
`
  });

  const text = res.text.toLowerCase();

  if (text.includes("order")) return "order";
  if (text.includes("billing")) return "billing";
  return "support";
}
