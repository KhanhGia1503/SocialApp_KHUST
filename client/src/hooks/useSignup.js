import toast from "react-hot-toast";

const { useState } = require("react");
const { useAuthContext } = require("../context/AuthContext");

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signup = async ({
    name,
    username,
    password,
    confirmPassword,
    gender,
    email,
    dob,
  }) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8800/server/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          password,
          confirmPassword,
          gender,
          email,
          birthday: dob,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading };
};
export default useSignup;
