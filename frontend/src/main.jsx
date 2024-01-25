import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Root from "./routes/root.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ChatRoom from "./routes/ChatRoom.jsx";
import Login from "./routes/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
    loader: async () => {
      redirect("/chatroom/2");
      return null;
    },
  },
  {
    path: "chatroom/:userid",
    element: <ChatRoom />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
