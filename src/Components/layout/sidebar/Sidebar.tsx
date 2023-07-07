import React, { FC } from "react";
import UserItems from "./UserItems";
import Menu from "./Menu";
const Sidebar: FC = () => {
  return (
    <div>
      <Menu />
      <UserItems />
    </div>
  );
};
export default Sidebar;
