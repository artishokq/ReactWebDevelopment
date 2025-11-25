import { useState } from "react";
import styled from "styled-components";
// Styled Components

const Container = styled.div`
  padding: 20px;
  background: var(--widget-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: var(--text-color);
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const TodoItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 10px;
  background: var(--item-bg);
  border-radius: 4px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  opacity: ${(props) => (props.completed ? 0.6 : 1)};
`;

const DeleteButton = styled.button`
  margin-left: auto;
  padding: 5px 10px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #c82333;
  }
`;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container id="todo">
      <Title>To-Do List</Title>
      <InputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Добавить задание..."
        />
        <Button onClick={addTodo}>Добавить</Button>
      </InputContainer>
      {todos.map((todo) => (
        <TodoItem key={todo.id} completed={todo.completed}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
          <DeleteButton onClick={() => deleteTodo(todo.id)}>
            Удалить
          </DeleteButton>
        </TodoItem>
      ))}
    </Container>
  );
}

export default ToDoList;
