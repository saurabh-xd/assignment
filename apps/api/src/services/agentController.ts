import { routerAgent } from "../agents/router.js";
import { orderAgent } from "../agents/orderAgent.js";
import { billingAgent } from "../agents/billingAgent.js";
import { supportAgent } from "../agents/supportAgent.js";

export async function handleMessage(message: string) {
  const intent = await routerAgent(message);

  if (intent === "order") {
    return orderAgent(message);
  }

  if (intent === "billing") {
    return billingAgent(message);
  }

  return supportAgent(message);
}
