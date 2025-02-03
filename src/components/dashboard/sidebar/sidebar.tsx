import Logo from "@/components/shared/logo";
import { currentUser } from "@clerk/nextjs/server";
import React, { FC } from "react";
import UserInfo from "./user-info";
import SidebarNavAdmin from "./nav-admin";
import { adminDashboardSidebarOptions } from "@/constants/data";

interface SidebarProps {
  isAdmin?: boolean;
}

const Sidebar: FC<SidebarProps> = async ({ isAdmin }) => {
  const user = await currentUser();
  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col items-center fixed top-0 left-0 bottom-0">
      <Logo width="100%" height="50px" className="text-blue-500 " />
      <span className="mt-3" />
      {user && <UserInfo user={user} />}
      {isAdmin && <SidebarNavAdmin menuLinks={adminDashboardSidebarOptions} />}
    </div>
  );
};

export default Sidebar;
