import { callLLM } from '../utils/llm.js';

const SYSTEM_PROMPT = `You are an expert requirements analyst.
Extract the user intent into structured form.
Return ONLY valid JSON with this exact structure:
{
  "app_name": "string",
  "app_type": "web|mobile|api",
  "features": ["list", "of", "features"],
  "entities": ["User", "Product"],
  "auth_required": true,
  "roles": ["admin", "user"],
  "payments_required": false,
  "assumptions": ["any assumption you made"]
}`;

export async function extractIntent(userPrompt) {
  console.log('Stage 1: Extracting intent...');
  const result = await callLLM(SYSTEM_PROMPT, `User prompt: "${userPrompt}"`);
  const required = ['app_name', 'features', 'entities', 'auth_required'];
  for (const field of required) {
    if (!(field in result)) throw new Error(`Stage 1 missing field: ${field}`);
  }
  return result;
}
