import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import chat from "./routes/chat.js";



const app = new Hono();

app.get("/", (c) => c.text("API running"));

app.route("/api/chat", chat);

serve({
  fetch: app.fetch,
  port: 3000,
});
