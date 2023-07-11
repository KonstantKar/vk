import React, { FC, useState } from "react";
import { Alert, Box, TextField } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import useAuth from "../../providers/useAuth";
import { addDoc, collection } from "firebase/firestore";

const AddPost: FC = () => {
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const { user, db } = useAuth();

  const addPostFunction = async (e: any) => {
    if (e.key === "Enter" && user) {
      try {
        await addDoc(collection(db, "posts"), {
          author: user,
          content: content,
          createdData: "10 минут назад",
        });
      } catch (e: any) {
        setError(e);
      }
      setContent("");
    }
  };

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error},
        </Alert>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Добавь пост!"
          variant="filled"
          sx={{ width: "100%" }}
          onKeyDown={addPostFunction}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <AddAPhotoOutlinedIcon sx={{ marginRight: 1 }} />
        <QueueMusicOutlinedIcon sx={{ marginRight: 1 }} />
        <CameraOutlinedIcon />
      </Box>
    </>
  );
};

export default AddPost;
