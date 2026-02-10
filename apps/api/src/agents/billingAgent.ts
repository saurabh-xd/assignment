import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { getInvoiceDetails } from "../tools/getInvoice.js";

export async function billingAgent(message: string) {
  // extract invoice like INV-001
  const match = message.match(/INV-\d+/i);
  const invoiceNo = match ? match[0].toUpperCase() : null;

  let invoiceInfo = "";

  if (invoiceNo) {
    invoiceInfo = await getInvoiceDetails(invoiceNo);
  }

  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: `
You are a billing support agent.

User message: ${message}

Invoice info from database:
${invoiceInfo}

Respond helpfully.
`
  });

  return res.text;
}
