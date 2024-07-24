import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Profile</h1>
            <div>Cập nhật profile</div>
          </div>
          <div className="info">
            <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            <div className="text">
              <span>
                User name: <p>John Dee</p>
              </span>
              <span>
                Email: <p>YF5vT@example.com</p>
              </span>
            </div>
          </div>
          <div className="title">
            <h1>Danh sách của tôi</h1>
            <div>Thêm bài đăng</div>
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
