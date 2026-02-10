import { prisma } from "@repo/db";
import { routerAgent } from "../agents/router.js";
import { orderAgent } from "../agents/orderAgent.js";
import { billingAgent } from "../agents/billingAgent.js";
import { supportAgent } from "../agents/supportAgent.js";

export async function handleMessage(
  message: string,
  conversationId?: string
) {
  // create conversation if not provided
  let conversation;

  if (!conversationId) {
    conversation = await prisma.conversation.create({
      data: {},
    });
  } else {
    conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
  }

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // save user message
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content: message,
    },
  });

  // route intent
  const intent = await routerAgent(message);

  let reply = "";

  if (intent === "order") {
    reply = await orderAgent(message);
  } else if (intent === "billing") {
    reply = await billingAgent(message);
  } else {
    reply = await supportAgent(message);
  }

  // save AI reply
  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      content: reply,
    },
  });

  return {
    reply,
    conversationId: conversation.id,
  };
}
