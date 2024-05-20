import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

const { useState } = require("react");

const useLogin = () => {
  //   const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const login = async ({ email, password }) => {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      //   setAuthUser(data);
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
