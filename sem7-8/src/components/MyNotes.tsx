import React, { useState } from "react";

// Inline Styles

interface Note {
  id: number;
  text: string;
}

function MyNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputValue, setInputValue] = useState("");

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    background: "var(--widget-bg)",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle: React.CSSProperties = {
    marginBottom: "20px",
    color: "var(--text-color)",
    fontSize: "24px",
  };

  const inputContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  };

  const textareaStyle: React.CSSProperties = {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
    minHeight: "60px",
    resize: "vertical",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    height: "fit-content",
  };

  const noteItemStyle: React.CSSProperties = {
    padding: "15px",
    marginBottom: "10px",
    background: "var(--item-bg)",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  };

  const deleteButtonStyle: React.CSSProperties = {
    padding: "5px 10px",
    background: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginLeft: "10px",
  };

  const addNote = () => {
    if (inputValue.trim()) {
      setNotes([...notes, { id: Date.now(), text: inputValue }]);
      setInputValue("");
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div id="notes" style={containerStyle}>
      <h2 style={titleStyle}>Мои заметки</h2>
      <div style={inputContainerStyle}>
        <textarea
          style={textareaStyle}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Напишите заметку..."
        />
        <button style={buttonStyle} onClick={addNote}>
          Добавить
        </button>
      </div>
      {notes.map((note) => (
        <div key={note.id} style={noteItemStyle}>
          <p style={{ margin: 0, flex: 1 }}>{note.text}</p>
          <button style={deleteButtonStyle} onClick={() => deleteNote(note.id)}>
            Удалить
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyNotes;
