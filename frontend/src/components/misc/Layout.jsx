import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import {FooterCentered} from './Footer'
const Layout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterCentered/>
    </div>
  );
};

export default Layout;
