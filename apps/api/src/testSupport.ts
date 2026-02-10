import "dotenv/config";
import { supportAgent } from "./agents/supportAgent.js";

async function test() {
  const res = await supportAgent("How do I change my address?");
  console.log(res);
}

test();
