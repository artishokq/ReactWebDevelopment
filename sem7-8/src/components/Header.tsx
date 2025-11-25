import styles from "./Header.module.scss";

// SCSS module

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Mini-Dashboard - Семинар 7-8</h1>
      <p className={styles.author}>Выполнил: Ткачук Артём, БПИ237</p>
    </header>
  );
}

export default Header;
