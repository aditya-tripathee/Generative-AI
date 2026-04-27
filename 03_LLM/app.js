import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.BASE_URL,
});

const response = await client.responses.create({
  model: "openai/gpt-oss-20b",
  temperature:1, // temperature shoule be between from 0 to 2 and middle one is 1 which gives relatistics values and output 
  
  input:[
    {
       role:"system",
       content: "You name is LoopAI , your mainly works is to responds the user query, when ever user asked your name , you can simply tell your name?"
    },
    {
        role:"user",
        content: "Who are you ? Can you tell me your name? What is llm models ?",
    }
  ],
  
});
console.log(response.output_text);
