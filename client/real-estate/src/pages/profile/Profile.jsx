import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(currentUser);

  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Profile</h1>
            <Link to="/profile/update">
              <div className="btn">Cập nhật profile</div>
            </Link>
          </div>
          <div className="info">
            <img src={currentUser.avatar || "../../../noAvatar.png"} />
            <div className="text">
              <span>
                User name: <p>{currentUser.username}</p>
              </span>
              <span>
                Email: <p>{currentUser.email}</p>
              </span>
              <div onClick={handleLogout} className="btn">
                Đăng xuất
              </div>
            </div>
          </div>
          <div className="title">
            <h1>Danh sách của tôi</h1>
            <Link to="/add">
              <div className="btn">Thêm bài đăng</div>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Danh sách đã lưu</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Profile;
