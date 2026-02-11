import { prisma } from "@repo/db";
import { routerAgent } from "../agents/router.js";
import { orderAgent } from "../agents/orderAgent.js";
import { billingAgent } from "../agents/billingAgent.js";
import { supportAgent } from "../agents/supportAgent.js";

export async function handleMessage(message: string, conversationId?: string) {
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

  await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "user",
      content: message,
    },
  });

  const history = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    orderBy: { createdAt: "asc" },
  });

  const intent = await routerAgent(message);

  let reply = "";

  if (intent === "order") {
    reply = await orderAgent(message, history);
  } else if (intent === "billing") {
    reply = await billingAgent(message, history);
  } else {
    reply = await supportAgent(message, history);
  }

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
