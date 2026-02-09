import "dotenv/config";
import { routerAgent } from "./agents/router.js";

async function test() {
  const intent = await routerAgent("Where is my order ORD-001?");
  console.log("Intent:", intent);
}

test();
