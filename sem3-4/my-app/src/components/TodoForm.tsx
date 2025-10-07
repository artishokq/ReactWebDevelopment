import React, { useState, useRef, useEffect } from "react";

interface TodoFormProps {
  onAddTask: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim());
      setText("");
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TodoForm;
