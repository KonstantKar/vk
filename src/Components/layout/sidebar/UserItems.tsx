import { Box, Card, Avatar } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
const UserItems: FC = () => {
  return (
    <Card variant="outlined" sx={{ padding: 1, backgroundColor: "#F1F7FA" }}>
      <Link
        to={"/profile"}
        style={{ display: "flex", alignItems: "center", color: "#111" }}
      >
        <Avatar>
          <img
            src="https://codequest.ru/images/default/avatar.jpg"
            alt=""
            width="40"
            height="40"
          />
        </Avatar>
        <span style={{ fontSize: 14 }}>Дмитрия Лыжина</span>
      </Link>
    </Card>
  );
};

export default UserItems;
