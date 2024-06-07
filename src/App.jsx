import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Products />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
