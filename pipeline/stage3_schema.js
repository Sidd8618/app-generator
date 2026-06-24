import { callLLM } from '../utils/llm.js';

const SYSTEM_PROMPT = `You are a schema engineer.
Generate complete schemas from the system design.
Return ONLY valid JSON with this exact structure:
{
  "ui_schema": {
    "pages": [{ "name": "string", "route": "string", "layout": "sidebar", "components": [{ "type": "form", "id": "string", "fields": [] }] }]
  },
  "api_schema": {
    "base_url": "/api/v1",
    "endpoints": [{ "id": "string", "method": "GET", "path": "string", "request_body": {}, "response": {}, "auth_required": true, "roles": [] }]
  },
  "db_schema": {
    "tables": [{ "name": "string", "columns": [{ "name": "string", "type": "VARCHAR", "nullable": false, "primary_key": false }], "indexes": [] }]
  },
  "auth_schema": {
    "strategy": "JWT",
    "roles": [],
    "permissions": {}
  },
  "business_logic": [{ "rule": "string", "trigger": "string", "action": "string" }]
}`;

export async function generateSchemas(intent, design) {
  console.log('Stage 3: Generating schemas...');
  return await callLLM(
    SYSTEM_PROMPT,
    `Intent: ${JSON.stringify(intent)}\nDesign: ${JSON.stringify(design)}`
  );
}

