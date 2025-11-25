import styles from "./Navbar.module.scss";

// SCSS module

function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={styles.navbar}>
      <button
        onClick={() => scrollToSection("todo")}
        className={styles.navButton}
      >
        To-Do List
      </button>
      <button
        onClick={() => scrollToSection("weather")}
        className={styles.navButton}
      >
        Погода
      </button>
      <button
        onClick={() => scrollToSection("notes")}
        className={styles.navButton}
      >
        Мои заметки
      </button>
    </nav>
  );
}

export default Navbar;
