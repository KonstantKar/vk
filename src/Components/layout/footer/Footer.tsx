import React, { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Announcement,
  Group,
  Home,
  MessageSharp,
  Newspaper,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "fixed", // Задаем фиксированное позиционирование
        bottom: 0, // Приклеиваем футер к нижней части экрана
        width: "100%", // Задаем ширину 100%, чтобы футер занимал всю ширину экрана
        backgroundColor: "#fff", // Задаем цвет фона
        boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)", // Добавляем небольшую тень снизу
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Профиль"
          icon={<Home />}
          onClick={() => navigate("/Profile")}
        />
        <BottomNavigationAction
          label="Друзья"
          icon={<Group />}
          onClick={() => navigate("/Friends")}
        />
        <BottomNavigationAction
          label="Новости"
          icon={<Newspaper />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Сообщения"
          icon={<MessageSharp />}
          onClick={() => navigate("/messages")}
        />
        <BottomNavigationAction
          label="Хакерские новости"
          icon={<Announcement />}
          onClick={() => navigate("/hackersNews")}
        />
        <BottomNavigationAction
          label="Магазин"
          icon={<AddShoppingCartIcon />}
          onClick={() => navigate("/Shop")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
