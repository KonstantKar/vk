import React, { FC, useState } from "react";
import { Box } from "@mui/material";

import { Post } from "../../../types";

import AddPost from "./AddPost";
import Posts from "./Posts";
import { initialPosts } from "./initialPosts";
const Home: FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  return (
    <Box>
      <AddPost setPosts={setPosts} />
      <Posts posts={posts} />
    </Box>
  );
};

export default Home;
