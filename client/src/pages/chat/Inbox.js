import List from "../../components/Inbox/List/List";
import Chat from "../../components/Inbox/Chat/Chat";
import Detail from "../../components/Inbox/Detail/Detail";
import style from "./Inbox.module.css";
function Inbox() {
  return (
    <div
      className={`${style.container} m-0 d-flex bg-secondary
    `}
    >
      <List className="flex-1"></List>
      <Chat></Chat>
      <Detail></Detail>
    </div>
  );
}

export default Inbox;
