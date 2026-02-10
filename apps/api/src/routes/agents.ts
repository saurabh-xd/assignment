import { Hono } from "hono";

const agents = new Hono();

agents.get("/", (c) => {
  return c.json([
    { name: "router" },
    { name: "order" },
    { name: "billing" },
    { name: "support" },
  ]);
});

export default agents;
