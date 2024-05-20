const { useState } = require("react");
const { useAuthContext } = require("../context/AuthContext");

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signup = async (input) => {
    setLoading(True);
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
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
