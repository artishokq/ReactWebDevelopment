import { useState, useRef, useCallback, useMemo } from "react";
import useFormValidation from "../hooks/useFormValidation";

export default function UserForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // хук для валидации
  const { isValid, errors } = useFormValidation(formValues);

  // useCallback для оптимизации обработчиков
  const handleInputChange = useCallback((field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
      setShowSuccess(false);
    };
  }, []);

  // useMemo для мемоизации ошибок
  const displayedErrors = useMemo(() => {
    return errors;
  }, [errors]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      if (errors.name) {
        nameInputRef.current?.focus();
      } else if (errors.email) {
        emailInputRef.current?.focus();
      } else if (errors.password) {
        passwordInputRef.current?.focus();
      }
    } else {
      setShowSuccess(true);
      console.log("Форма отправлена:", formValues);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Регистрация пользователя</h2>

      <form onSubmit={handleSubmit}>
        {/* поле имени */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Имя:</label>
          <input
            ref={nameInputRef}
            type="text"
            value={formValues.name}
            onChange={handleInputChange("name")}
            style={{
              width: "100%",
              padding: "8px",
              border: displayedErrors.name ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {displayedErrors.name && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {displayedErrors.name}
            </div>
          )}
        </div>

        {/* поле емэил */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            ref={emailInputRef}
            type="email"
            value={formValues.email}
            onChange={handleInputChange("email")}
            style={{
              width: "100%",
              padding: "8px",
              border: displayedErrors.email
                ? "1px solid red"
                : "1px solid #ccc",
            }}
          />
          {displayedErrors.email && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {displayedErrors.email}
            </div>
          )}
        </div>

        {/* поле пароля */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Пароль:
          </label>
          <input
            ref={passwordInputRef}
            type="password"
            value={formValues.password}
            onChange={handleInputChange("password")}
            style={{
              width: "100%",
              padding: "8px",
              border: displayedErrors.password
                ? "1px solid red"
                : "1px solid #ccc",
            }}
          />
          {displayedErrors.password && (
            <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {displayedErrors.password}
            </div>
          )}
        </div>

        {/* кнопка отправить */}
        <button
          type="submit"
          disabled={!isValid}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isValid ? "#4CAF50" : "#8e8c8cff",
            color: "white",
            border: "none",
            cursor: isValid ? "pointer" : "not-allowed",
          }}
        >
          Отправить
        </button>
      </form>

      {/* успех? */}
      {showSuccess && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
          }}
        >
          Форма успешно отправлена!
        </div>
      )}
    </div>
  );
}
