import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
  id: number;
  name: string;
};

export type UsersState = {
  list: User[];
};

const initialState: UsersState = {
  list: [
    { id: 1, name: "Иван" },
    { id: 2, name: "Мария" },
    { id: 3, name: "Алексей" },
    { id: 4, name: "Артём" },
    { id: 5, name: "Евгений" },
    { id: 6, name: "Кирилл" },
    { id: 7, name: "Анна" },
    { id: 8, name: "Кек" },
    { id: 9, name: "Лол" },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserName(state, action: PayloadAction<User>) {
      const { id, name } = action.payload;
      const user = state.list.find((user) => user.id === id);
      if (user) {
        user.name = name;
      }
    },
  },
});

export const { updateUserName } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

// селектор для получения данных о пользователях
export const selectUsers = (state: { users: UsersState }) => state.users.list;

// селектор для данных о конкретном пользователе
export const selectUserById = (state: { users: UsersState }, id: number) =>
  state.users.list.find((user) => user.id === id);
