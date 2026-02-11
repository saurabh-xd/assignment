import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { getOrderDetails } from "../tools/getOrder.js";

export async function orderAgent(message: string, history: any[]) {
 
  const match = message.match(/ORD-\d+/i);
  const orderNo = match ? match[0].toUpperCase() : null;

  let orderInfo = "";

  if (orderNo) {
    orderInfo = await getOrderDetails(orderNo);
  }

  // 🧠 convert history to text
  const historyText = history
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

   const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are an ORDER SUPPORT AGENT.

Conversation so far:
${historyText}

New user message:
${message}

Order info from database:
${orderInfo}

Instructions:
- Use conversation context
- If order exists → give status
- If not → ask for correct order id
- Be concise and helpful
`
  });

  return res.text;
}
