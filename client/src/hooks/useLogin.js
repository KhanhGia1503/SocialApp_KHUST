import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const { useState } = require("react");

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:8800/server/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      if (data.role === "admin") {
        navigate("/admin-home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};
export default useLogin;
