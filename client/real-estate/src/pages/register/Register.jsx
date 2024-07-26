import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import "./register.scss";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Tại tài khoản</h1>
          <input
            name="username"
            required
            type="text"
            placeholder="Tên tài khoản"
          />
          <input name="email" required type="text" placeholder="Email" />
          <input
            name="password"
            required
            type="password"
            placeholder="Mật khẩu"
          />
          <button disabled={loading}>Đăng ký</button>
          {error && <span>{error}</span>}
          <Link to="/login">Bạn đã có tài khoản?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="../../../realEstate.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
