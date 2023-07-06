import React, { FC, useState } from "react";
import { Box, TextField } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import QueueMusicOutlinedIcon from "@mui/icons-material/QueueMusicOutlined";
import CameraOutlinedIcon from "@mui/icons-material/CameraOutlined";
import { Post, TypeSetState } from "../../../types";
import { dataUsers } from "../../layout/sidebar/SidebarData/dataUsers";

interface AddPostProps {
  setPost: TypeSetState<Post[]>;
}

const AddPost: FC<AddPostProps> = ({ setPost }) => {
  const [content, setContent] = useState("");
  const addPostFunction = () => {
    setPost((prev) => [
      ...prev,
      {
        author: dataUsers[0],
        content: content,
        createdData: "5 минут назад",
      },
    ]);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Добавь пост!"
        variant="filled"
        sx={{ width: "100%" }}
        onKeyPress={addPostFunction}
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
