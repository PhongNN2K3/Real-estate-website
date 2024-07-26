import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import NavbarHeader from "../navbarHeader/NavbarHeader";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <div className="header">
        <NavbarHeader />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

const RequiredAuthLayout = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="layout">
        <div className="header">
          <NavbarHeader />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
};

export { Layout, RequiredAuthLayout };
