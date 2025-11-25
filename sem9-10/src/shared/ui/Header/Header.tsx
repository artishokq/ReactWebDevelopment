import { useLocation } from "react-router-dom";

import styles from "./Header.module.css";

function Header() {
  const location = useLocation();

  let title = "Список пользователей";

  if (location.pathname.startsWith("/list") || location.pathname === "/") {
    title = "Список пользователей";
  } else if (location.pathname.startsWith("/user/")) {
    title = "Детали пользователя";
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

export default Header;
