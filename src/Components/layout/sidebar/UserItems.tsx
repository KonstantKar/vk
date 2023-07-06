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
        <Link
          to={"/profile"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#111",
            marginBottom: 12,
          }}
        >
          <Avatar>
            <img
              src="https://codequest.ru/images/default/avatar.jpg"
              alt=""
              width="36"
              height="36"
            />
          </Avatar>
          <span style={{ fontSize: 14, marginLeft: 10 }}>Дмитрия Лыжина</span>
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
        </Link>
        <Link
          to={"/profile"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#111",
            marginBottom: 12,
          }}
        >
          <Avatar>
            <img
              src="https://codequest.ru/images/default/avatar.jpg"
              alt=""
              width="36"
              height="36"
            />
          </Avatar>
          <span style={{ fontSize: 14, marginLeft: 10 }}>Дмитрия Лыжина</span>
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
        </Link>
        <Link
          to={"/profile"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#111",
            marginBottom: 12,
          }}
        >
          <Avatar>
            <img
              src="https://codequest.ru/images/default/avatar.jpg"
              alt=""
              width="36"
              height="36"
            />
          </Avatar>
          <span style={{ fontSize: 14, marginLeft: 10 }}>Дмитрия Лыжина</span>
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
        </Link>
        <List>
          <ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="Сообщения" />
            </ListItemButton>
          </ListItemButton>
        </List>
      </Card>
    </div>
  );
};

export default UserItems;
