import React from "react";

interface TodoTask {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: TodoTask;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#888" : "#000",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </li>
  );
};

export default TodoItem;
