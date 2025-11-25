import React, { useState, useEffect } from "react";

// Inline Styles

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.body.className = isDark ? "dark-theme" : "";
  }, [isDark]);

  const buttonStyle: React.CSSProperties = {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px 20px",
    background: isDark ? "#fff" : "#333",
    color: isDark ? "#333" : "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
    zIndex: 1000,
  };

  return (
    <button style={buttonStyle} onClick={() => setIsDark(!isDark)}>
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeSwitcher;
