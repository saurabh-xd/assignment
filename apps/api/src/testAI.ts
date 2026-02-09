import "dotenv/config";
import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

async function test() {
  const res = await generateText({
    model: groq("llama-3.1-8b-instant"),
    prompt: "Say hello"
  });

  console.log(res.text);
}

test();
