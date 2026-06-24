# App Generation Pipeline — AI Engineer Assignment

A multi-stage AI pipeline that converts natural language into a complete, validated app configuration — like a compiler for software generation.

## Live Demo
[Click here to try it](https://app-generator-xxxx.onrender.com)

## How It Works

Natural language prompt → 4 stage pipeline → validated JSON config

### Stage 1 — Intent Extraction
Parses the user prompt into structured intermediate form including entities, roles, features, and assumptions.

### Stage 2 — System Design
Converts intent into app architecture including pages, API endpoints, data models, and auth design.

### Stage 3 — Schema Generation
Generates complete schemas including UI schema, API schema, DB schema, auth rules, and business logic.

### Stage 4 — Validation and Repair Engine
Detects and automatically repairs issues including missing keys, cross-layer inconsistencies, and schema mismatches.

## Tech Stack
- Node.js + Express
- Groq API (llama-3.3-70b-versatile)

## Pipeline Architecture

```
┌─────────────────────────────────────────────────────┐
│                   USER PROMPT                        │
│  "Build a CRM with login, contacts, dashboard..."   │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              STAGE 1: INTENT EXTRACTION              │
│  • Parse features, entities, roles                  │
│  • Identify auth and payment requirements           │
│  • Document assumptions for vague prompts           │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              STAGE 2: SYSTEM DESIGN                  │
│  • Define pages and routes                          │
│  • Design API endpoints                             │
│  • Plan data models and relationships               │
│  • Set up auth roles and permissions                │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│             STAGE 3: SCHEMA GENERATION               │
│  • UI Schema  → pages, components, layouts          │
│  • API Schema → endpoints, methods, validation      │
│  • DB Schema  → tables, columns, relations          │
│  • Auth Schema → roles, permissions, JWT            │
│  • Business Logic → rules, triggers, actions        │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│          STAGE 4: VALIDATION + REPAIR ENGINE         │
│  • Check all required keys exist                    │
│  • Verify API matches DB schema                     │
│  • Verify UI maps to API endpoints                  │
│  • Auto repair broken sections                      │
│  • Retry up to 3 times with targeted fixes          │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│            FINAL VALIDATED JSON CONFIG               │
│  Ready to power a real application                  │
└─────────────────────────────────────────────────────┘

         ↻ Auto-repair loop between Stage 3 and 4
```
- Vanilla HTML/CSS/JS frontend

## Pipeline Architecture
