import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styling
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Friends from "./pages/Friends.jsx";
import Favorites from "./pages/Favorites.jsx";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
