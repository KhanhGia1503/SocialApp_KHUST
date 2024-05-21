import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";

const { useState } = require("react");
const useSendMessageFromProfile = (userReceiver) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const message = async (userReceiver) => {
    try {
      const res = await fetch(
        `http://localhost:8800/message/get${userReceiver.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "application/json" },
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      setSelectedConversation(data);
      navigate("/inbox");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { message };
};
export default useSendMessageFromProfile;
