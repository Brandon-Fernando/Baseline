import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";

const Layout = () => (
  <div className="layout">
  <Header />

  <div className="page-area">
    <main className="page-scroll">
      <div className="page-content">
        <Outlet />
      </div>
    </main>

    <div className="header-fade" aria-hidden="true" />
  </div>
</div>
);

export default Layout;