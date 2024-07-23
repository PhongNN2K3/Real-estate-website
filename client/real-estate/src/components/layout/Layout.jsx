import { Outlet } from "react-router-dom";
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

export default Layout;
