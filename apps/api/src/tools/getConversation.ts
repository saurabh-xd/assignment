import { prisma } from "@repo/db";

export async function getConversationHistory(conversationId: string) {
  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" }
  });

  return messages.map(m => `${m.role}: ${m.content}`).join("\n");
}
