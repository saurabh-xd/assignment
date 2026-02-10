import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { getOrderDetails } from "../tools/getOrder.js";

export async function orderAgent(message: string) {
  // Try to extract order number like ORD-001
  const match = message.match(/ORD-\d+/i);
  const orderNo = match ? match[0].toUpperCase() : null;

  let orderInfo = "";

  if (orderNo) {
    orderInfo = await getOrderDetails(orderNo);
  }

  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are an order support agent.

User message: ${message}

Order info from database:
${orderInfo}

Respond helpfully to the user.
`
  });

  return res.text;
}
