import { useState, useEffect } from "react";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface ValidationErrors {
  name: string;
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

export default function useFormValidation(values: FormValues): ValidationResult {
  const [errors, setErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const newErrors: ValidationErrors = {
      name: "",
      email: "",
      password: "",
    };

    // валидации
    if (values.name.length > 0 && values.name.length < 3) {
      newErrors.name = "Имя должно содержать хотя бы 3 символа";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (values.email.length > 0 && !emailRegex.test(values.email)) {
      newErrors.email = "Введите правильный email";
    }

    if (values.password.length > 0 && values.password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
    }

    setErrors(newErrors);

    // проверяем что все поля заполнены и нет ошибок
    const allFieldsFilled =
      values.name.length > 0 &&
      values.email.length > 0 &&
      values.password.length > 0;
    const noErrors = !newErrors.name && !newErrors.email && !newErrors.password;

    setIsValid(allFieldsFilled && noErrors);
  }, [values]);

  return { isValid, errors };
}
