import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { getInvoiceDetails } from "../tools/getInvoice.js";

export async function billingAgent(message: string, history: any[]) {
 
  const match = message.match(/INV-\d+/i);
  const invoiceNo = match ? match[0].toUpperCase() : null;

  let invoiceInfo = "";

  if (invoiceNo) {
    invoiceInfo = await getInvoiceDetails(invoiceNo);
  }

  // conversation history
  const historyText = history
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are a BILLING SUPPORT AGENT.

Conversation so far:
${historyText}

New user message:
${message}

Invoice info from database:
${invoiceInfo}

Instructions:
- Use conversation context
- Help user with billing/refund/payment issues
`
  });

  return res.text;
}
