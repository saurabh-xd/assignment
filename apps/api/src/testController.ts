import "dotenv/config";
import { handleMessage } from "./services/agentController.js";

async function test() {
  const res = await handleMessage("I need refund");
  console.log(res);
}

test();
