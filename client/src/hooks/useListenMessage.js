const { useEffect } = require("react");
const { useSocketContext } = require("../context/SocketContext");
const { default: useConversation } = require("../zustand/useConversation");

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages]);
};
export default useListenMessages;
