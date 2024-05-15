import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/",
      element: <Home/>,
    },
  ]);
  
  return (
    <div>
    <RouterProvider router={router} />
    </div>

  );
}

export default App;
