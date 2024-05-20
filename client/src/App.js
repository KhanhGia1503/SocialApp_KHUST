import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import ChangePassword from "./pages/resetpassword/ChangePassword";
function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/password-reset",
      element: <ResetPassword />,
    },
    {
      path: "/",
      element: <Home />,
    },
    { path: "/reset/:token", element: <ChangePassword></ChangePassword> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </div>
  );
}

export default App;
