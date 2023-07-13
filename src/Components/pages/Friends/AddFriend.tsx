import React, { FC, useState } from "react";
import { Alert, Box, Button, Card, TextField } from "@mui/material";
import useAuth from "../../providers/useAuth";
import { addDoc, collection } from "firebase/firestore";

const AddFriend: FC = () => {
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");
  const { db } = useAuth();

  const addFriendFunction = async () => {
    try {
      await addDoc(collection(db, "friends"), {
        id: userId,
        name: name,
        status: status,
        avatar: avatar,
        background: background,
      });
    } catch (e: any) {
      setError(e);
    }
    setName("");
    setStatus("");
    setAvatar("");
    setUserId("");
    setBackground("");
  };

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error}
        </Alert>
      )}
      <Card
        variant="outlined"
        sx={{ padding: 2, backgroundColor: "#F1F7FA", marginBottom: 3 }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="ID друга"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Имя друга"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Статус друга"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Ссылка на аватарку"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Ссылка на обои"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setBackground(e.target.value)}
            value={background}
          />
        </Box>
        <Button onClick={addFriendFunction}>Добавить друга</Button>
      </Card>
    </>
  );
};

export default AddFriend;
