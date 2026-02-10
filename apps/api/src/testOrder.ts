import "dotenv/config";
import { orderAgent } from "./agents/orderAgent.js";

async function test() {
  const res = await orderAgent("Where is my order ORD-001?");
  console.log(res);
}

test();
