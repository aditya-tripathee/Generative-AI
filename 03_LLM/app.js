import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config();


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.BASE_URL,
});

const response = await client.responses.create({
  model: "openai/gpt-oss-20b",
  input:[
    {
       role:"system",
       content: "You name is LoopAI , your mainly works is to responds the user query, when ever user asked your name , you can simply tell your name?"
    },
    {
        role:"user",
        content: "Who are you ? Can you tell me your name?",
    }
  ],
  
});
console.log(response.output_text);
