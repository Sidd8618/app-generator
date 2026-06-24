import { callLLM } from '../utils/llm.js';

function checkStructure(schema) {
  const errors = [];
  const required = ['ui_schema','api_schema','db_schema','auth_schema','business_logic'];
  for (const key of required) {
    if (!schema[key]) errors.push(`Missing key: ${key}`);
  }
  return errors;
}

function checkConsistency(schema) {
  const errors = [];
  const tableNames = (schema.db_schema?.tables || []).map(t => t.name.toLowerCase());
  for (const endpoint of schema.api_schema?.endpoints || []) {
    const parts = endpoint.path.split('/').filter(Boolean);
    const resource = parts[parts.length - 1]?.replace(/s$/, '');
    if (resource && !tableNames.some(t => t.includes(resource) || resource.includes(t))) {
      errors.push(`API "${endpoint.path}" has no matching DB table`);
    }
  }
  return errors;
}

export async function validateAndRepair(schema, maxAttempts = 3) {
  console.log('Stage 4: Validating...');
  let current = schema;
  const report = { attempts: 0, errors_found: [], repairs_made: [] };

  for (let i = 0; i < maxAttempts; i++) {
    report.attempts++;
    const errors = [...checkStructure(current), ...checkConsistency(current)];
    if (errors.length === 0) {
      console.log(`Passed on attempt ${i + 1}`);
      break;
    }
    console.log(`Found ${errors.length} errors, repairing...`);
    report.errors_found.push(...errors);
    const fixed = await callLLM(
      `Fix this app schema. Return complete valid JSON with all 5 keys:
       ui_schema, api_schema, db_schema, auth_schema, business_logic.
       Fix these errors: ${errors.join('; ')}`,
      `Schema: ${JSON.stringify(current)}`
    );
    current = fixed;
    report.repairs_made.push(`Attempt ${i + 1} repair`);
  }
  return { schema: current, validation_report: report };
}


