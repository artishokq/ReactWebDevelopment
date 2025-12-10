import { type FormEvent, useMemo, useRef, useState } from "react";
import "./App.css";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  type User,
} from "./features/users/usersApi";
import { axiosClient } from "./api/axiosClient";

function App() {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [axiosUsersCount, setAxiosUsersCount] = useState<number | null>(null);
  const [axiosError, setAxiosError] = useState<string | null>(null);
  const [axiosLoading, setAxiosLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sortedUsers = useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
  }, [users]);

  const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    try {
      await addUser({ name, email }).unwrap();
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (user: User) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditName("");
    setEditEmail("");
  };

  const handleEditUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingUser) return;
    try {
      await updateUser({
        id: editingUser.id,
        name: editName,
        email: editEmail,
      }).unwrap();
      cancelEdit();
    } catch (error) {
      console.error(error);
    }
  };

  const loadWithAxios = async () => {
    setAxiosError(null);
    setAxiosUsersCount(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setAxiosLoading(true);
    try {
      const response = await axiosClient.get<User[]>("/users", {
        signal: controller.signal,
      });
      setAxiosUsersCount(response.data.length);
    } catch (error) {
      if (
        (error as Error).name === "CanceledError" ||
        (error as Error).name === "AbortError"
      ) {
        setAxiosError("Загрузка отменена");
      } else {
        setAxiosError("Ошибка при загрузке через Axios");
      }
    } finally {
      setAxiosLoading(false);
    }
  };

  const cancelAxiosLoad = () => {
    abortControllerRef.current?.abort();
  };

  return (
    <div className="app">
      <h1>Список пользователей</h1>

      <section className="block">
        <h2>Пользователи (RTK Query)</h2>
        {isLoading && <p>Загрузка...</p>}
        {isError && <p className="error">Ошибка при загрузке пользователей</p>}
        <button onClick={() => refetch()} className="button button-secondary">
          Обновить список
        </button>
        <ul className="user-list">
          {sortedUsers.map((user) => (
            <li key={user.id} className="user-item">
              <div>
                <strong>{user.name}</strong>
                <div className="user-email">{user.email}</div>
              </div>
              <button
                onClick={() => startEdit(user)}
                className="button button-small"
              >
                Редактировать
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2>Добавить пользователя</h2>
        <form onSubmit={handleAddUser} className="form">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="button" disabled={isAdding}>
            {isAdding ? "Сохранение..." : "Добавить"}
          </button>
        </form>
      </section>

      {editingUser && (
        <section className="block">
          <h2>Редактировать пользователя</h2>
          <form onSubmit={handleEditUser} className="form">
            <input
              type="text"
              placeholder="Имя"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            <div className="form-actions">
              <button type="submit" className="button" disabled={isUpdating}>
                {isUpdating ? "Сохранение..." : "Сохранить"}
              </button>
              <button
                type="button"
                className="button button-secondary"
                onClick={cancelEdit}
              >
                Отмена
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="block">
        <h2>Загрузка через Axios + AbortController</h2>
        <div className="axios-controls">
          <button
            onClick={loadWithAxios}
            className="button"
            disabled={axiosLoading}
          >
            Загрузить пользователей через Axios
          </button>
          <button
            onClick={cancelAxiosLoad}
            className="button button-secondary"
            disabled={!axiosLoading}
          >
            Отменить загрузку
          </button>
        </div>
        {axiosLoading && <p>Загрузка через Axios...</p>}
        {axiosUsersCount !== null && !axiosLoading && (
          <p>Через Axios получено пользователей: {axiosUsersCount}</p>
        )}
        {axiosError && <p className="error">{axiosError}</p>}
      </section>
    </div>
  );
}

export default App;
