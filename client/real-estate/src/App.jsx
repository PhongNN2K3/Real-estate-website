import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuthLayout } from "./components/layout/Layout";
import Home from "./pages/home/Home";
import ListPage from "./pages/listPage/ListPage";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import SinglePage from "./pages/singlePage/SinglePage";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/list", element: <ListPage /> },
        { path: "/:id", element: <SinglePage /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <RequiredAuthLayout />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/updateProfile", element: <UpdateProfile /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
