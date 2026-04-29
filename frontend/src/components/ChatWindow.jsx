import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import SuggestionChips from "./SuggestionChips";

export default function ChatWindow({
  messages,
  isLoading,
  onSendMessage,
  suggestions,
  persona,
}) {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleSuggestionClick = (suggestion) => {
    onSendMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    // Submit on Enter, newline on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-window">
      {/* Message list */}
      <div className="messages-container">
        {isEmpty && (
          <div className="empty-state">
            <span className="empty-emoji">{persona.emoji}</span>
            <h2>Chat with {persona.name}</h2>
            <p>Ask me anything or pick a suggestion below.</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {isLoading && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion chips — shown when chat is empty */}
      {isEmpty && (
        <SuggestionChips
          suggestions={suggestions}
          onSelect={handleSuggestionClick}
          disabled={isLoading}
        />
      )}

      {/* Input area */}
      <form className="input-area" onSubmit={handleSubmit}>
        <textarea
          ref={inputRef}
          className="message-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${persona.name}...`}
          rows={1}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-btn"
          disabled={!inputText.trim() || isLoading}
          title="Send message"
        >
          ➤
        </button>
      </form>
    </div>
  );
}
