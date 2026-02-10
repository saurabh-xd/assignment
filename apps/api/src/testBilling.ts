import "dotenv/config";
import { billingAgent } from "./agents/billingAgent.js";

async function test() {
  const res = await billingAgent("I need help with invoice INV-001");
  console.log(res);
}

test();
