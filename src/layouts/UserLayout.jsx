import React from "react";
import UserSidebarComponent from "../components/user/UserSidebarComponent";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="flex">
      <UserSidebarComponent />
      <div className="container-class md:px-6!">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;
