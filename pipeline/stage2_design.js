import { callLLM } from '../utils/llm.js';

const SYSTEM_PROMPT = `You are a senior software architect.
Given extracted intent, design the app architecture.
Return ONLY valid JSON with this exact structure:
{
  "pages": [{ "name": "string", "route": "/path", "components": ["list"] }],
  "api_endpoints": [{ "method": "GET", "path": "/api/...", "description": "string", "auth": true, "roles": [] }],
  "data_models": [{ "name": "string", "fields": [{ "name": "string", "type": "string", "required": true }], "relations": [] }],
  "auth": { "type": "JWT", "roles": [], "permissions": {} }
}`;

export async function designSystem(intent) {
  console.log('Stage 2: Designing system...');
  return await callLLM(
    SYSTEM_PROMPT,
    `Design an app based on this intent: ${JSON.stringify(intent, null, 2)}`
  );
}