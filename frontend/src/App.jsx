import { useState, useCallback } from "react";
import PersonaSwitcher from "./components/PersonaSwitcher";
import ChatWindow from "./components/ChatWindow";

const API_BASE = "https://persona-chatbot-backend-2bbg.onrender.com";

const PERSONAS = [
  { id: "anshuman", name: "Anshuman Singh", emoji: "🧠" },
  { id: "abhimanyu", name: "Abhimanyu Saxena", emoji: "🚀" },
  { id: "kshitij", name: "Kshitij Mishra", emoji: "🎯" },
];

const SUGGESTIONS = {
  anshuman: [
    "How do I start DSA?",
    "I feel stuck in coding",
    "How to learn deeply?",
  ],
  abhimanyu: [
    "How to build a startup?",
    "How to choose a career?",
    "How to stay consistent?",
  ],
  kshitij: [
    "I know recursion",
    "I'm good at DSA",
    "I don't understand trees",
  ],
};

export default function App() {
  const [activePersona, setActivePersona] = useState(PERSONAS[0]);
  const [chatHistories, setChatHistories] = useState({
    anshuman: [],
    abhimanyu: [],
    kshitij: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  // Switch persona and reset only that persona's chat
  const handlePersonaSwitch = useCallback((persona) => {
    setActivePersona(persona);
  }, []);

  const currentMessages = chatHistories[activePersona.id];

  const sendMessage = useCallback(
    async (userText) => {
      if (!userText.trim() || isLoading) return;

      const userMessage = { role: "user", content: userText };
      const updatedHistory = [...currentMessages, userMessage];

      // Optimistically add user message
      setChatHistories((prev) => ({
        ...prev,
        [activePersona.id]: updatedHistory,
      }));

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText,
            persona: activePersona.id,
            // Send only the previous history (without the new message) so the
            // server doesn't duplicate it (it appends user message itself)
            history: currentMessages,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        const assistantMessage = { role: "assistant", content: data.reply };

        setChatHistories((prev) => ({
          ...prev,
          [activePersona.id]: [...updatedHistory, assistantMessage],
        }));
      } catch (error) {
        const errorMessage = {
          role: "assistant",
          content: `⚠️ Error: ${error.message}`,
          isError: true,
        };
        setChatHistories((prev) => ({
          ...prev,
          [activePersona.id]: [...updatedHistory, errorMessage],
        }));
      } finally {
        setIsLoading(false);
      }
    },
    [activePersona, currentMessages, isLoading]
  );

  const clearChat = useCallback(() => {
    setChatHistories((prev) => ({ ...prev, [activePersona.id]: [] }));
  }, [activePersona]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">AI Chatbot</h1>
        <button className="clear-btn" onClick={clearChat} title="Clear chat">
          Clear Chat
        </button>
      </header>

      <PersonaSwitcher
        personas={PERSONAS}
        activePersona={activePersona}
        onSwitch={handlePersonaSwitch}
      />

      <ChatWindow
        messages={currentMessages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
        suggestions={SUGGESTIONS[activePersona.id]}
        persona={activePersona}
      />
    </div>
  );
}
