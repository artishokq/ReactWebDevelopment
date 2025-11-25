import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import UsersList from "../pages/UsersListPage/UsersListPage";
import UserDetails from "../pages/UserDetailsPage/UserDetailsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UsersList />,
      },
      {
        path: "list",
        element: <UsersList />,
      },
      {
        path: "user/:id",
        element: <UserDetails />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function RouterBuilder() {
  return <RouterProvider router={router} />;
}

export default RouterBuilder;
