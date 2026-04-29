# Prompt Engineering Documentation

---

## Overview

This chatbot uses **system prompts** to simulate distinct AI personas. Each persona is defined by a carefully crafted prompt injected at the start of every conversation, instructing the language model to adopt a specific identity, tone, and teaching philosophy.

Rather than using a single generic assistant, this approach allows users to experience meaningfully different interactions — the same question gets a structurally different answer depending on the persona selected.

---

## Personas

### 🧠 Anshuman Singh

**Thinking Style:** First-principles reasoning. Breaks problems down to their fundamentals before building up to a solution.

**Communication Style:**
- Structured, step-by-step explanations
- Uses real-world analogies and examples
- Explains the WHY, not just the WHAT
- Ends every response with a reflective question

**Prompt Strategy:**
- Defined a clear persona with specific beliefs (depth over memorization, curiosity, active learning)
- Included few-shot examples showing how Anshuman phrases responses
- Added signature phrases ("Let me break this down", "The reality is") to create voice consistency
- Constrained output to medium-length, structured answers

---

### 🚀 Abhimanyu Saxena

**Thinking Style:** Execution-focused and outcome-driven. Thinks in goals, trade-offs, and iteration cycles.

**Communication Style:**
- Action-oriented and decisive
- Focuses on practical next steps over theory
- Frames advice around outcomes and real-world applicability
- Ends responses with a forward-looking question

**Prompt Strategy:**
- Defined the persona around a founder's mindset (North Star goals, iteration, execution)
- Used few-shot examples to demonstrate how Abhimanyu avoids over-explaining theory
- Added behavioral rules: always tie advice to outcomes, push toward action
- Signature phrases ("What really matters is", "At the end of the day") create a distinct voice

---

### 🎯 Kshitij Mishra

**Thinking Style:** Socratic and intellectually precise. Exposes gaps in reasoning rather than filling them directly.

**Communication Style:**
- Uses counter-questions to make the user think
- Never gives answers immediately — challenges first
- Applies subtle, calm sarcasm when users are overconfident
- Keeps responses short and sharp

**Prompt Strategy:**
- Defined clear behavioral triggers (vague → challenge, confident → test, wrong → dismantle calmly)
- Used few-shot examples to show the exact format of challenge-based responses
- Constrained tone to calm intellectual dominance — never rude, always precise
- Signature phrases ("Be precise.", "Think again.", "That sounds fine on the surface, but...") reinforce identity

---

## Techniques Used

### 1. System Prompts
Each persona is defined using a system-role message sent at the beginning of every API call. This sets the model's "character" before any user input is processed.

```
{ role: "system", content: personaSystemPrompt }
```

### 2. Few-Shot Prompting
Each system prompt includes 2–3 sample exchanges (User → Assistant) that demonstrate the exact tone, structure, and phrasing the model should follow. This dramatically improves persona consistency.

### 3. Tone Control
Explicit tone instructions are included — e.g., "never overly friendly", "calm and composed", "action-oriented". Without these, the model defaults to a generic helpful tone.

### 4. Behavioral Constraints
Each prompt defines what the persona should and should not do:
- ✅ "Always explain WHY, not just WHAT"
- ✅ "End with a question"
- ❌ "No fluff"
- ❌ "Do not give direct answers immediately"

### 5. Output Format Control
Prompts specify expected response length (short, medium) and structure (bullet points, numbered steps, paragraph form) to keep outputs predictable and readable.

---

## Learnings

- **Prompt wording has a large impact on output quality.** Vague instructions like "be helpful" produce generic responses. Specific rules like "end with a reflective question" produce consistent, intentional behavior.

- **Few-shot examples are the most powerful technique.** Showing the model what a response should look like is more effective than describing it in abstract terms.

- **Persona consistency requires explicit constraints.** Without behavioral rules, the model tends to drift toward a polite, neutral tone — losing the persona's character over multi-turn conversations.

- **Structured prompts improve readability.** Using headers (### Persona, ### Style, ### Rules) inside the system prompt makes it easier to maintain and update individual sections without breaking others.

- **Signature phrases create voice.** Defining 3–4 recurring phrases per persona makes the AI feel like a real, recognizable individual rather than a generic chatbot.
