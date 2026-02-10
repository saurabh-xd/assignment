import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import chat from "./routes/chat.js";
import { cors } from "hono/cors";
import agents from "./routes/agents.js";



const app = new Hono();

app.use("*", cors({
  origin: "http://localhost:3000",
  allowMethods: ["GET", "POST", "DELETE"],
  allowHeaders: ["Content-Type"],
}));


app.get("/", (c) => c.text("API running"));
app.get("/health", (c) => c.json({ status: "ok" }));


app.route("/api/chat", chat);
app.route("/api/agents", agents);

serve({
  fetch: app.fetch,
  port: 3001,
});
