import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ToDoList from "./components/ToDoList";
import WeatherWidget from "./components/WeatherWidget";
import MyNotes from "./components/MyNotes";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <ThemeSwitcher />
      <Header />
      <Navbar />
      <main className="main-content">
        <ToDoList />
        <WeatherWidget />
        <MyNotes />
      </main>
    </div>
  );
};

export default App;
