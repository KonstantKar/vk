import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { QuestionAnswer } from "@mui/icons-material";
import { dataUsers } from "./SidebarData/dataUsers";
import { collection, onSnapshot } from "firebase/firestore";
import { User } from "../../../types";
import useAuth from "../../providers/useAuth";

const UserItems: FC = () => {
  const [sideFriends, setSideFriends] = useState<User[]>([]);
  const { db } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/messages"); // Переход на новый маршрут
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "friends"), (snapshot) => {
      const newFriends = snapshot.docs.map((doc) => doc.data() as User);
      setSideFriends(newFriends);
    });
    return () => {
      unsub();
    };
  }, []);

  const firstFourFriends = sideFriends.slice(0, 4);

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
        {firstFourFriends.map((sf) => (
          <Link
            key={sf.id}
            to={`/profile/${sf.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#111",
              marginBottom: 12,
            }}
          >
            <Avatar>
              <img src={sf.avatar} alt="" width="48" height="48" />
            </Avatar>
            <Typography style={{ fontSize: 18, marginLeft: 10 }}>
              {sf.name}
            </Typography>
            {sf.online && (
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
