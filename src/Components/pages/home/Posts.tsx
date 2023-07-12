import React, { FC, useEffect, useState } from "react";
import { Post } from "../../../types";
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import useAuth from "../../providers/useAuth";

const Posts: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { db } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const newPosts = snapshot.docs.map((doc) => doc.data() as Post);
      setPosts(newPosts);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {loading ? (
        <Card
          variant="outlined"
          sx={{
            padding: 2,
            backgroundColor: "#F1F7FA",
            marginBottom: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Card>
      ) : (
        <div>
          {posts.map((post, index) => (
            <Box
              sx={{ border: "1px solid #e2e2e2", padding: 2, marginTop: 3 }}
              key={`Post-${index}`}
            >
              {post.author && (
                <Link
                  key={post.author.id}
                  to={`/profile/${post.author.id}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#111",
                    marginBottom: 12,
                  }}
                >
                  <Avatar>
                    <img
                      src={post.author.avatar}
                      alt=""
                      width="48"
                      height="48"
                    />
                  </Avatar>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      {post.author.name}
                    </span>{" "}
                    <span style={{ fontSize: 14, marginLeft: 10 }}>
                      {post.createdData}
                    </span>
                  </div>
                </Link>
              )}
              <p>{post.content}</p>
              {post.images && post.images.length > 0 && (
                <ImageList cols={2} gap={12}>
                  {post.images.map((item) => (
                    <ImageListItem key={item.image}>
                      <img src={item.image} alt={""} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Box>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
