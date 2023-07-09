import React, { FC } from "react";
import UserItems from "./UserItems";
import Menu from "./Menu";
import User from "./User";
const Sidebar: FC = () => {
  return (
    <div>
      <User />
      <Menu />
      <UserItems />
    </div>
  );
};
export default Sidebar;
