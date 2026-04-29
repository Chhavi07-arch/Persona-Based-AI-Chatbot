# 🤖 Persona-Based AI Chatbot

A full-stack AI chatbot where users can have real conversations with 3 distinct personas — each with a unique teaching style, tone, and mindset.

---

## 🌐 Live Demo

| | URL |
|---|---|
| **Frontend** | [persona-chatbot-frontend-gilt.vercel.app](https://persona-chatbot-frontend-gilt.vercel.app/) |
| **Backend** | [persona-chatbot-backend-2bbg.onrender.com](https://persona-chatbot-backend-2bbg.onrender.com) |

> **Note:** Backend is hosted on Render's free tier. Initial requests may take 30–50 seconds due to cold start.

---

## ✨ Features

- 💬 **Chat Interface** — Clean, ChatGPT-style UI
- 🧠 **3 AI Personas** — Each with a custom system prompt and personality
- 🔄 **Persona Switching** — Chat resets per persona, histories stay separate
- 💡 **Suggestion Chips** — Quick-start questions per persona
- ⏳ **Typing Indicator** — Animated dots while waiting for response
- ⚠️ **Error Handling** — User-friendly error messages
- 📱 **Responsive UI** — Works on mobile and desktop

---

## 🧑‍🏫 Personas

| Persona | Style |
|---|---|
| 🧠 **Anshuman Singh** | First-principles thinker. Structures every answer, explains the WHY. |
| 🚀 **Abhimanyu Saxena** | Execution-focused founder. Action-oriented, outcome-driven. |
| 🎯 **Kshitij Mishra** | Sharp instructor. Challenges assumptions, never spoon-feeds. |

---

## 🗂️ Project Structure

```
chatbot-app/
├── backend/
│   ├── server.js         # Express server + OpenRouter integration
│   ├── .env              # API keys (not committed)
│   ├── .env.example      # Template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx                   # Root component
    │   ├── App.css                   # Styles
    │   └── components/
    │       ├── PersonaSwitcher.jsx
    │       ├── ChatWindow.jsx
    │       ├── MessageBubble.jsx
    │       ├── TypingIndicator.jsx
    │       └── SuggestionChips.jsx
    ├── index.html
    └── package.json
```

---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
OPENROUTER_API_KEY=your_api_key_here
PORT=3001
```

Start the server:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

> Get your free API key at [openrouter.ai](https://openrouter.ai)

---

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `OPENROUTER_API_KEY` | Your OpenRouter API key |
| `PORT` | Backend port (default: 3001) |

---

## 🔁 How It Works

```
User types message
      ↓
React frontend sends POST /chat
      ↓
Express backend selects persona system prompt
      ↓
Sends to OpenRouter API (gpt-3.5-turbo)
      ↓
Response returned to frontend
      ↓
Displayed in chat UI
```

---

## 🧬 Prompt Engineering

Each persona is controlled entirely through a **system prompt** injected at the start of every API call. This tells the language model who it is, how to think, and how to respond — before the user says anything.

Key techniques used:
- **System prompts** — define persona identity, tone, and beliefs
- **Few-shot examples** — sample Q&A pairs inside the prompt to guide response style
- **Behavioral constraints** — explicit rules for what the persona should and should not do
- **Signature phrases** — recurring language patterns that make each persona feel distinct

> See [`prompts.md`](./prompts.md) for full prompt engineering documentation.

---

## 🚀 Future Improvements

- [ ] Persistent chat history (localStorage or database)
- [ ] Streaming responses (token-by-token like ChatGPT)
- [ ] Add more personas
- [ ] Dark/light mode toggle
- [ ] Voice input support

---

## 👩‍💻 Author

**Chhavi Ahlawat**
Built as part of a Gen AI project submission.
