import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import ListPage from "./pages/listPage/ListPage";
import SinglePage from "./pages/singlePage/SinglePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/list", element: <ListPage /> },
        { path: "/:id", element: <SinglePage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
