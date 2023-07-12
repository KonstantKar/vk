import React, { FC, useState } from "react";
import { Alert, Box, Button, Card, TextField } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import useAuth from "../../providers/useAuth";
import { addDoc, collection } from "firebase/firestore";

const AddFriend: FC = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [avatar, setAvatar] = useState("");
  const { user, db } = useAuth();

  const addFriendFunction = async () => {
    try {
      await addDoc(collection(db, "friends"), {
        name: name,
        status: status,
        avatar: avatar,
      });
    } catch (e: any) {
      setError(e);
    }
    setName("");
    setStatus("");
    setAvatar("");
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
            label="Имя друга"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Введи статус"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Ссылка на изображение"
            variant="filled"
            sx={{ width: "100%", marginBottom: "10px" }}
            onChange={(e) => setAvatar(e.target.value)}
            value={avatar}
          />
        </Box>
        <Button onClick={addFriendFunction}>Добавить друга</Button>
      </Card>
    </>
  );
};

export default AddFriend;
