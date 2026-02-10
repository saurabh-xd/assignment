import { Hono } from "hono";

const agents = new Hono();

// list all agents
agents.get("/", (c) => {
  return c.json([
    {
      name: "support",
      description: "General support & FAQs",
      tools: ["getConversationHistory"],
    },
    {
      name: "order",
      description: "Order tracking & status",
      tools: ["getOrderDetails"],
    },
    {
      name: "billing",
      description: "Invoices, refunds, payments",
      tools: ["getInvoiceDetails"],
    },
  ]);
});

// single agent capabilities
agents.get("/:type", (c) => {
  const type = c.req.param("type");

  if (type === "order") {
    return c.json({
      agent: "order",
      tools: ["getOrderDetails"],
    });
  }

  if (type === "billing") {
    return c.json({
      agent: "billing",
      tools: ["getInvoiceDetails"],
    });
  }

  if (type === "support") {
    return c.json({
      agent: "support",
      tools: ["getConversationHistory"],
    });
  }

  return c.json({ error: "Agent not found" }, 404);
});

export default agents;
