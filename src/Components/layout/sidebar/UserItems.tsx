import React, { FC } from "react";
import {
  Box,
  Card,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { QuestionAnswer } from "@mui/icons-material";
import { dataUsers } from "./SidebarData/dataUsers";

const UserItems: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/messages"); // Переход на новый маршрут
  };
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ padding: 1, backgroundColor: "#F1F7FA", marginBottom: 3 }}
      >
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Лучшие друзья" />
          </ListItemButton>
        </List>
        {dataUsers.map((el) => (
          <Link
            key={el.id}
            to={`/profile/${el.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#111",
              marginBottom: 12,
            }}
          >
            <Avatar>
              <img src={el.avatar} alt="" width="48" height="48" />
            </Avatar>
            <span style={{ fontSize: 14, marginLeft: 10 }}>{el.name}</span>
            {el.online && (
              <Box
                sx={{
                  backgroundColor: "#4FB14F",
                  width: 12,
                  height: 12,
                  border: "1px solid #F1F7FA",
                  borderRadius: 50,
                  marginLeft: 1,
                }}
              />
            )}
          </Link>
        ))}
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <QuestionAnswer />
            </ListItemIcon>
            <ListItemText primary="Сообщения" />
          </ListItemButton>
        </List>
      </Card>
    </div>
  );
};

export default UserItems;
