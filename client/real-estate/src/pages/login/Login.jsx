import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./login.scss";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      navigate("/");
      updateUser(res.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Chào mừng bạn quay lại</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Tên người dùng"
          />
          <input
            name="password"
            type="password"
            minLength={6}
            required
            placeholder="Mật khẩu"
          />
          <button disabled={loading}>Đăng nhập</button>
          {error && <span>{error}</span>}
          <Link to="/register">
            <p>{"Bạn chưa có tài khoản?"}</p>
          </Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="../../../realEstate.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
