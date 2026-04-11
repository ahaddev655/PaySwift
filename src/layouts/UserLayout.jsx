import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebarComponent from "../components/user/UserSidebarComponent";

function UserLayout() {
  return (
    <div className="flex">
      <UserSidebarComponent />
      <div className="container-class">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
