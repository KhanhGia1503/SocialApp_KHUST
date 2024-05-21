import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const { useState } = require("react");

const useSearchUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const searchUser = async (input) => {
    input = input.trim();
    try {
      const res = await fetch(`http://localhost:8800/server/users/${input}`, {
        credentials: "include",
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      navigate(`/${data.id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, searchUser };
};
export default useSearchUser;
