import { useSocketContext } from "../../../../context/SocketContext";
import useGetConversation from "../../../../hooks/useGetConversations";
import useSearchConversation from "../../../../hooks/useSearchConversation";
import useConversation from "../../../../zustand/useConversation";
import style from "./ChatList.module.css";
import React, { useState, useEffect } from "react";

function ChatList() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [searchTerm, setSearchTerm] = useState("");
  const { loading, conversations } = useGetConversation();
  const { onlineUsers } = useSocketContext();
  const { searchConversation } = useSearchConversation();
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {}, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchConversationHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim().length === 0) {
      return;
    }
    searchConversation(searchTerm);
    console.log(searchConversation);
  };
  return (
    <div className={`${style.chatList}  `}>
      <div className="search pt-0 p-3">
        <div className={`${style.searchBar} p-2 d-flex`}>
          <img
            onClick={searchConversationHandler}
            className={`${style.search} `}
            src="./img/search.png"
          ></img>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={searchTerm}
          ></input>
        </div>
      </div>
      <div className={`${style.listUsersInbox}  `}>
        {/* <div className={`${style.userInbox} gap-3 p-3 d-flex`}>
          <img src="./avatar.png"></img>
          <div className={`${style.texts}  gap-1`}>
            <span className="fs-5 fw-bolder">Nguyen</span>
            <p className="m-0 fs-6 fw-normal">you 're free rn?</p>
          </div>
        </div> */}
        {conversations.length > 0 &&
          conversations.map((conversation) => {
            const isOnline = onlineUsers.includes(conversation.user.email);
            const isSelected = conversation.id === selectedConversation?.id;
            return (
              <div
                key={conversation.id}
                className={`${style.userInbox} ${
                  isSelected ? "bg-primary" : ""
                } gap-3 p-3 d-flex`}
                onClick={() => {
                  setSelectedConversation(conversation);
                }}
              >
                {" "}
                <div className="position-relative">
                  <img src="./img/avatar.png"></img>
                  {onlineUsers.includes(conversation?.user.email) ? (
                    <div className={`${style.activing}`}></div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={`${style.texts}  gap-1`}>
                  <span className="fs-5 fw-bolder">
                    {conversation.user.name}
                  </span>
                  <p className="m-0 fs-6 fw-normal">you 're free rn?</p>
                </div>
              </div>
            );
          })}

        {conversations.length === 0 && (
          <div className={`${style.texts} p-3  gap-1`}>
            <p className="m-0 fs-6 fw-normal">You have no conversations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatList;
