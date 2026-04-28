import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: process.env.BASE_URL,
});

const response = await client.responses.create({
  model: "openai/gpt-oss-20b",
  temperature: 1, // temperature shoule be between from 0 to 2 and middle one is 1 which gives relatistics values and output
  input: [
    {
      role: "system",
      content: `
               You are a interview grader assistant. Your task is to generate candidate evaulation score.
               Output must be following JSON format :
               {
                confidence_score: 0-100,
                accuracy_score: 0-100,
                overall_score: 0-100,
                reason: short reason for the score,
                pass : boolean(true if overall_score is greater than 70 else false)

               }
                The response must :
                1. Include all fields shown above
                2. Use only the exact fields names shown
                3. Follow the exact data types specified
                4. Contain ONLY the JSON object without any additional text or explanation.
               
               
               `,
    },
    {
      role: "user",
      content: `
           Ques1 :-- What is JavaScript and its features?
            Answer :-- JavaScript is a versatile programming language primarily used for web development. It allows developers to create interactive and dynamic web pages. Some of its key features include:
           
           Ques2 :-- What is the difference between var, let and const in JavaScript?
             Answer :-- The main differences between var, let, and const in JavaScript are: 
             1. Scope: var is function-scoped, while let and const are block-scoped.
              2. Hoisting: var declarations are hoisted to the top of their scope and initialized with undefined, while let and const declarations are hoisted but not initialized.
              3. Reassignment: var and let can be reassigned, while const cannot be reassigned after its initial assignment.

            Ques3 :-- What are closures in JavaScript?
              Answer :-- Closures in JavaScript are a fundamental concept that allows a function to access variables from its outer (enclosing) function even after the outer function has finished executing. A closure is created when a function is defined inside another function and retains access to the outer function's variables. This enables powerful programming patterns, such as data encapsulation and the creation of private variables.

    `,
    },
  ],
});
console.log(response.output_text);
