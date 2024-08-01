import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuthLayout } from "./components/layout/Layout";
import { listPageLoader, singlePageLoader } from "./lib/loaders";
import Home from "./pages/home/Home";
import ListPage from "./pages/listPage/ListPage";
import Login from "./pages/login/Login";
import NewPostPage from "./pages/newPostPage/NewPostPage";
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
        { path: "/list", element: <ListPage />, loader: listPageLoader },
        { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <RequiredAuthLayout />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/profile/update", element: <UpdateProfile /> },
        { path: "/add", element: <NewPostPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
