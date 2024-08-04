import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IconContext } from "react-icons";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";
import "./navbarHeader.scss";

const NavbarHeader = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) {
    fetch();
  }

  return (
    <div className="header">
      <div className="left">
        <Navbar className="bg-body-tertiary ">
          <Container className="container">
            <Navbar.Brand as={Link} to="/" className="logo">
              <img
                alt="logo"
                src="../../../logo.png"
                width="40"
                height="40"
                className="d-inline-block align-top"
              />
              <span>Real Estate</span>
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto nav-items">
                <Nav.Link as={Link} to="/">
                  Trang chủ
                </Nav.Link>
                <Nav.Link as={Link} to={"/about"}>
                  Giới thiệu
                </Nav.Link>
                <Nav.Link as={Link} to={"/contact"}>
                  Liên hệ
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="right">
        {currentUser ? (
          <Nav className="me-auto user-nav-items">
            <img
              className="avatar"
              src={currentUser.avatar || "../../../noAvatar.png"}
            />
            <span className="username">{currentUser.username}</span>
            <Nav.Link className="profile-container" as={Link} to="/profile">
              <div className="profile">
                {number > 0 && <div className="notification">{number}</div>}
                <span>Profile</span>
              </div>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto nav-items">
            <Nav.Link className="sign-in" as={Link} to="/login">
              Đăng nhập
            </Nav.Link>
            <Nav.Link className="sign-up" as={Link} to="/register">
              Đăng ký
            </Nav.Link>
          </Nav>
        )}
        <div className="menu-icon">
          <IconContext.Provider value={{ size: "32px" }}>
            {show ? (
              <TiThMenu
                style={{ color: "#fff" }}
                onClick={() => setShow(!show)}
              />
            ) : (
              <TiThMenu onClick={() => setShow(!show)} />
            )}
          </IconContext.Provider>
        </div>
        <div className={`menu ${show ? "active" : ""}`}>
          <Nav className="me-auto menu-items">
            <Nav.Link as={Link} to="/">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Giới thiệu
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Liên hệ
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
            )}
            {!currentUser && (
              <Nav.Link as={Link} to="/login">
                Đăng nhập
              </Nav.Link>
            )}
            {!currentUser && (
              <Nav.Link as={Link} to="/signup">
                Đăng ký
              </Nav.Link>
            )}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
