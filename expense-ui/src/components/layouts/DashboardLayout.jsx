import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { useAuth } from "../../contexts/UserContext";

function DashboardLayout({ activeMenu, children }) {
  const { user } = useAuth();
  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1000px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
