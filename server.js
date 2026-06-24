import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { extractIntent }     from './pipeline/stage1_intent.js';
import { designSystem }      from './pipeline/stage2_design.js';
import { generateSchemas }   from './pipeline/stage3_schema.js';
import { validateAndRepair } from './pipeline/stage4_validate.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.post('/generate', async (req, res) => {
  const startTime = Date.now();
  const { prompt } = req.body;
  if (!prompt || prompt.trim().length < 10) {
    return res.status(400).json({ error: 'Prompt too short' });
  }
  try {
    console.log('Starting pipeline...');
    const intent  = await extractIntent(prompt);
    console.log('Stage 1 done');
    const design  = await designSystem(intent);
    console.log('Stage 2 done');
    const schemas = await generateSchemas(intent, design);
    console.log('Stage 3 done');
    const { schema, validation_report } = await validateAndRepair(schemas);
    console.log('Stage 4 done');
    res.json({
      success: true,
      prompt,
      pipeline_stages: { intent, design },
      final_schema: schema,
      validation_report,
      latency_ms: Date.now() - startTime
    });
  } catch (err) {
    console.error('Pipeline error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
