import { useAuthContext } from "../../../../context/AuthContext";
import { Link } from "react-router-dom";
import style from "./Userinfo.module.css";
function UserInfo() {
  const { authUser } = useAuthContext();
  console.log(authUser);
  return (
    <div className={`${style.userInfo} p-3 d-flex gap-5`}>
      <div className={`${style.user} d-flex gap-3`}>
        <img src="./img/avatar.png" alt="avatar"></img>
        <div></div>
        {/* <h2>{authUser?.name}</h2> */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className={`${style.khust}`}>KHUST</div>
        </Link>
      </div>
      <div className={`${style.icons} gap-3`}>
        <img src="./img/more.png"></img>
        <img src="./img/video.png"></img>
        <img src="./img/edit.png"></img>
      </div>
    </div>
  );
}

export default UserInfo;
