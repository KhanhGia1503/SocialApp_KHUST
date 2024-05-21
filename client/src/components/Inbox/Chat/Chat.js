import style from "./Chat.module.css";
import Button from "react-bootstrap/Button";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import useConversation from "../../../zustand/useConversation";
import useGetMessages from "../../../hooks/useGetMessage";
import useSendMessage from "../../../hooks/useSendMessage";
import useListenMessages from "../../../hooks/useListenMessage";
import { useAuthContext } from "../../../context/AuthContext";
import { useSocketContext } from "../../../context/SocketContext";
function Chat() {
  const [openEmj, setOpenEmj] = useState(false);
  const [msgInput, setMsgInput] = useState("");
  const endRef = useRef(null);

  const handleEmoji = (e) => {
    setMsgInput((pre) => pre + e.emoji);
  };
  useListenMessages();
  const { selectedConversation, setSelectedConversation } = useConversation();
  console.log("selectedConversation", selectedConversation);
  //show image when click
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { messages } = useGetMessages();
  const { sendMessage } = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgInput.trim() === "") {
      return;
    }

    await sendMessage(msgInput);
    setMsgInput("");
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  console.log("messages", messages);
  return (
    <>
      <div className={`${style.chat}`}>
        <div className={`${style.top} d-flex p-3 gap-3`}>
          <div className={`${style.user} gap-2 d-flex align-items-center`}>
            <div className="position-relative">
              <img src="./img/avatar.png"></img>
              {onlineUsers.includes(selectedConversation?.user?.email) ? (
                <div className={`${style.activing}`}></div>
              ) : (
                ""
              )}
            </div>
            <div className={`${style.texts} `}>
              <span className="fs-5 fw-bolder">
                {selectedConversation?.user?.name}
              </span>
              <p className="m-0 fs-6 fw-normal">
                {onlineUsers.includes(selectedConversation?.user?.email)
                  ? "Activing"
                  : ""}
              </p>
            </div>
          </div>
          <div className={`${style.icons} d-flex gap-3`}>
            <img src="./img/phone.png"></img>
            <img src="./img/video.png"></img>
            <img src="./img/info.png"></img>
          </div>
        </div>
        <div className={`${style.center} p-3 gap-3`}>
          {messages &&
            messages?.map((m, i) => {
              const isOwn = m.sender_id === authUser.id;

              return (
                <div
                  key={i}
                  className={`${style.message}  ${
                    isOwn ? style.own : ""
                  } gap-3`}
                >
                  {!isOwn && <img src="./img/avatar.png"></img>}
                  <div className={` ${style.texts}`}>
                    <p className="p-3">{m.content}</p>
                    {/* <span>1 min ago</span> */}
                  </div>
                  {i === messages.length - 1 && <div ref={endRef}></div>}
                </div>
              );
            })}
        </div>

        {/*
         */}

        <div className={`${style.bottom} p-3 gap-3 d-flex`}>
          <div className={`${style.icons} d-flex gap-3`}>
            <img src="./img/mic.png"></img>
            <img src="./img/img.png"></img>
          </div>

          <input
            className="p-1"
            type="text"
            placeholder="Type a message ..."
            value={msgInput}
            onChange={(e) => {
              setMsgInput(e.target.value);
            }}
          ></input>
          <div className={`${style.emoji}`}>
            <img
              src="./img/emoji.png"
              onClick={() => {
                setOpenEmj((pre) => !pre);
              }}
            ></img>
            <div className={`${style.emojiPicker}`}>
              <EmojiPicker
                open={openEmj}
                onEmojiClick={handleEmoji}
              ></EmojiPicker>
            </div>
          </div>
          <Button onClick={handleSubmit} variant="outline-primary">
            Send
          </Button>
        </div>
      </div>
    </>
  );
}

export default Chat;
