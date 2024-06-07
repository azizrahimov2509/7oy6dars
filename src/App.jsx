import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";

//login and SIgnUp

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  function Redirect({ children }) {
    let user = JSON.parse(localStorage.getItem("user")) ?? false;

    return user ? children : <Navigate to="/login" />;
  }

  const router = createBrowserRouter([
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <Redirect>
          <Layout />
        </Redirect>
      ),
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
