import "./App.css";
import Footer from "./components/Footer";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div>
      <main>
        <UserForm />
      </main>
      <Footer name="Ткачук Артём Сергеевич" date="21.10.2025" />
    </div>
  );
}

export default App;
