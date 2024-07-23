import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { IconContext } from "react-icons";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./navbarHeader.scss";

const NavbarHeader = () => {
  const [show, setShow] = useState(false);

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
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/about"}>
                  About
                </Nav.Link>
                <Nav.Link as={Link} to={"/contact"}>
                  Contact
                </Nav.Link>
                <Nav.Link as={Link} to={"/agents"}>
                  Agents
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="right">
        <Nav className="me-auto nav-items">
          <Nav.Link as={Link} to="/login">
            Sign in
          </Nav.Link>
          <Nav.Link className="sign-up" as={Link} to="/signup">
            Sign up
          </Nav.Link>
        </Nav>
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
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/agents">
              Agents
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Sign in
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign up
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default NavbarHeader;
