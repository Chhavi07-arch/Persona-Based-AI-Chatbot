export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user-row" : "assistant-row"}`}>
      {!isUser && <div className="avatar assistant-avatar">AI</div>}

      <div
        className={`bubble ${isUser ? "user-bubble" : "assistant-bubble"} ${
          message.isError ? "error-bubble" : ""
        }`}
      >
        {/* Render newlines as line breaks */}
        {message.content.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split("\n").length - 1 && <br />}
          </span>
        ))}
      </div>

      {isUser && <div className="avatar user-avatar">You</div>}
    </div>
  );
}
