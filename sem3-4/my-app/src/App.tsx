import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";

function App() {
  const headerTitle: string = "To Do List";
  const name: string = "Ткачук Артём Сергеевич";
  const date: string = "07.10.2025";

  return (
    <div className="App">
      <Header title={headerTitle} />

      <main className="content">
        <TodoList />
      </main>

      <Footer name={name} date={date} />
    </div>
  );
}

export default App;
