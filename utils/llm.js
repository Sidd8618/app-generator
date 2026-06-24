import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new Groq({ 
  apiKey: process.env.GROQ_API_KEY
});

export async function callLLM(systemPrompt, userMessage, temperature = 0.3) {
  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userMessage  }
    ]
  });
  return JSON.parse(response.choices[0].message.content);
}

