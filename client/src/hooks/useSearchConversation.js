import toast from "react-hot-toast";

const useSearchConversation = () => {
  const searchConversation = async (username) => {
    try {
      const res = await fetch(`http://localhost:8080/message/get/${username}`, {
        credentials: "include",
        method: "POST",
      });
      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };
  return { searchConversation };
};
export default useSearchConversation;
