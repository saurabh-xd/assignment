import { Hono } from "hono";
import { prisma } from "@repo/db";
import { handleMessage } from "../services/agentController.js";

const chat = new Hono();

chat.post("/messages", async (c) => {
  const body = await c.req.json();
  const { message, conversationId  } = body;



  const result = await handleMessage(message, conversationId);

  console.log("RESULT:", result);


   return c.json(result);
});

export default chat;



chat.get("/conversations/:id", async (c) => {
  const id = c.req.param("id");

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    orderBy: { createdAt: "asc" },
  });

  return c.json(messages);
});
