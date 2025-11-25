import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUsers } from "../../features/users/usersSlice";

function UsersListPage() {
  const users = useSelector(selectUsers);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersListPage;
