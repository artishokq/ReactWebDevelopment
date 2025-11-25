import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  selectUserById,
  updateUserName,
  type UsersState,
} from "../../features/users/usersSlice";

function UserDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(params.id);

  const user = useSelector((state: { users: UsersState }) =>
    selectUserById(state, id)
  );

  const [name, setName] = useState(user?.name ?? "");

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;

    dispatch(updateUserName({ id: user.id, name: name.trim() }));
    navigate("/list");
  };

  return (
    <div>
      <p>ID: {user.id}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default UserDetailsPage;
