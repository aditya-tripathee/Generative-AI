import OpenAI from "openai";
import { tavily  } from "@tavily/core";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.API_KEY, // better: GROQ_API_KEY
  baseURL: "https://api.groq.com/openai/v1",
});
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

const response = await client.chat.completions.create({
  model: "qwen/qwen3-32b", // tool/function calling supported Groq model
  temperature: 0,
  messages: [
    {
      role: "system",
      content: "You are a smart personal assistant. Use tools when real-time data is needed.",
    },
    {
      role: "user",
      content: "Who is the prime minister of Nepal?",
    },
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "websearch",
        description: "Search the web for real-time information",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search query",
            },
          },
          required: ["query"],
        },
      },
    },
  ],
  tool_choice: "auto",
});

const message = response.choices[0].message;
const toolCalls = message.tool_calls;

if (!toolCalls || toolCalls.length === 0) {
  console.log(message.content);
} else {
  for (const tool of toolCalls) {
    if (tool.function.name === "websearch") {
      const args = JSON.parse(tool.function.arguments);
      const result = await websearch(args);
      console.log(result);
    }
  }
}

async function websearch({ query,max_results = 1 }) {
  const response = await tvly.search(query, { max_results });
  return response;
  
}

