import ChatList from "./ChatList/ChatList";
import style from "./List.module.css";
import UserInfo from "./UserInfo/Userinfo";
function List() {
  return (
    <div className={`${style.list}`}>
      <UserInfo></UserInfo>
      <ChatList></ChatList>
    </div>
  );
}

export default List;
