import React, { FC, useState } from "react";
import { Box, TextField } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import { Post, TypeSetState } from "../../../types";
import { dataUsers } from "../../layout/sidebar/SidebarData/dataUsers";
import useAuth from "../../providers/useAuth";

interface AddPostProps {
  setPosts: TypeSetState<Post[]>;
}

const AddPost: FC<AddPostProps> = ({ setPosts }) => {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const addPostFunction = (e: any) => {
    if (e.key === "Enter" && user) {
      setPosts((prev) => [
        {
          author: user,
          content: content,
          createdData: "5 минут назад",
        },
        ...prev,
      ]);
      setContent("");
    }
  };
  return (
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
  );
};

export default AddPost;
