import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import AddPost from "./AddPost";
import { Post } from "../../../types";
const Home: FC = () => {
  const [post, setPost] = useState<Post[]>([]);
  return (
    <Box>
      <AddPost setPost={setPost} />
    </Box>
  );
};

export default Home;
