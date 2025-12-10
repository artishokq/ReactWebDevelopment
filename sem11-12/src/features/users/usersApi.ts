import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  id?: number;
  name: string;
  email: string;
}

const BASE_URL =
  "https://my-json-server.typicode.com/artishokq/ReactWebDevelopment/tree/25-11-25-sem";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      async onQueryStarted(_newUser, { dispatch, queryFulfilled }) {
        try {
          const { data: createdUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.push(createdUser);
            })
          );
        } catch {
          // если сервер не поддерживает POST, просто игнорируем ошибку
        }
      },
    }),
    updateUser: builder.mutation<User, User>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted(updatedUser, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            const index = draft.findIndex((user) => user.id === updatedUser.id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...updatedUser };
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } =
  usersApi;
