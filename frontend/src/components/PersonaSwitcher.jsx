export default function PersonaSwitcher({ personas, activePersona, onSwitch }) {
  return (
    <nav className="persona-switcher">
      {personas.map((persona) => (
        <button
          key={persona.id}
          className={`persona-tab ${activePersona.id === persona.id ? "active" : ""}`}
          onClick={() => onSwitch(persona)}
        >
          <span className="persona-emoji">{persona.emoji}</span>
          <span className="persona-name">{persona.name}</span>
        </button>
      ))}
    </nav>
  );
}
