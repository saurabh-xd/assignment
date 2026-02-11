import { Hono } from "hono";

const agents = new Hono();


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


agents.get("/:type/capabilities", (c) => {
  const type = c.req.param("type");

  if (type === "order") {
    return c.json({
      agent: "order",
      capabilities: "Order tracking, modifications, cancellations",
      tools: ["getOrderDetails"],
    });
  }

  if (type === "billing") {
    return c.json({
      agent: "billing",
      capabilities: "Invoices, refunds, payments",
      tools: ["getInvoiceDetails"],
    });
  }

  if (type === "support") {
    return c.json({
      agent: "support",
      capabilities: "General support inquiries, FAQs, troubleshooting",
      tools: ["getConversationHistory"],
    });
  }

  return c.json({ error: "Agent not found" }, 404);
});

export default agents;
