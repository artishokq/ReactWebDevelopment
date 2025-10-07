import { Component } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import CurrentTask from "./CurrentTask";

interface TodoTask {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListState {
  tasks: TodoTask[];
  currentTask: string;
}

class TodoList extends Component<object, TodoListState> {
  constructor(props: object) {
    super(props);
    this.state = {
      tasks: [],
      currentTask: "",
    };
  }

  addTask = (text: string): void => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      currentTask: text,
    }));
  };

  deleteTask = (id: number): void => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  };

  toggleComplete = (id: number): void => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  render() {
    return (
      <div className="todo-container">
        <TodoForm onAddTask={this.addTask} />
        <CurrentTask currentTask={this.state.currentTask} />

        <h2>Список задач:</h2>
        {this.state.tasks.length === 0 ? (
          <p>Нет задач. Добавьте новую задачу...</p>
        ) : (
          <ul className="todo-list">
            {this.state.tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={this.deleteTask}
                onToggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default TodoList;
