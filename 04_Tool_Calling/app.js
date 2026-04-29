// import OpenAI from "openai";
// import dotenv from "dotenv";
// dotenv.config();

// const client = new OpenAI({
//   apiKey: process.env.API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// const response = await client.chat.completions.create({
//   model: "model: gpt-4.1-mini",
//   temperature: 0,
//   messages: [
//     {
//       role: "system",
//       content: `
//                You are a smart personal assistant.
//                 Your task is to answer the questions related to users query.
//                  You should provide clear and concise answers to the user's questions.
//                     You can access the following tools :
//                     1. websearch{query} : {query:string} // You can use this tool to search the web for information and real time data.

//                `,
//     },
//     {
//       role: "user",
//       content: `
//                 Who is the prime minister of Nepal? 
//     `,
//     },
//   ],
//   tools: [
//     {
//       type: "function",
//       function: {
//         name: "websearch",
//         description: "Search the web for information and real time data",
//         parameters: {
//           // JSON Schema object
//           type: "object",
//           properties: {
//             query: {
//               type: "string",
//               description: "The search query to find the information on web",
//             },
//           },
//           required: ["query"],
//         },
//       },
//     },
//   ],
//   tool_choice: "auto",
// });

// const tools_called = response.choices[0].message.tools_called;
// if(!tools_called || tools_called.length === 0){
//     console.log(response.choices[0].message.content);
//     return;
// }
// for(const tool of tools_called){
//     if(tool.name === "websearch"){
//         const result = await websearch(tool.arguments);
//         console.log(result);
//     }}  
// // console.log(response.choices[0].message.content);

// async function websearch({ query }) {
//   // Implementation for web search functionality
//   return "Iphone 16 was lauched on 20 september 2024";
// }
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.API_KEY, // better: GROQ_API_KEY
  baseURL: "https://api.groq.com/openai/v1",
});

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

async function websearch({ query }) {
  console.log("Searching:", query);
  return "The current Prime Minister of Nepal is K. P. Sharma Oli.";
}