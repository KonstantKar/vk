import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import useAuth from "../../providers/useAuth";
import { useParams } from "react-router-dom";
import { AccountBox, Call, Message } from "@mui/icons-material";
import { Link } from "react-router-dom";

const FriendProfile: FC = () => {
  const { db } = useAuth();
  const [selectedFriend, setSelectedFriend] = useState(Object);
  const { id } = useParams();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "friends"), (snapshot) => {
      const Friends = snapshot.docs.map((doc) => doc.data());
      const selectedFriend = Friends.find((friend) => friend.id === id); // Фильтрация по ID
      setSelectedFriend(selectedFriend);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{ padding: 2, backgroundColor: "#F1F7FA", marginBottom: 3 }}
    >
      <Box>
        <CardMedia
          component="img"
          width="100%"
          height="200"
          image={selectedFriend?.background}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <img
              src={selectedFriend?.avatar}
              alt=""
              style={{
                width: 250,
                height: 250,
                objectFit: "cover",
                marginRight: 20,
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography gutterBottom variant="h4" component="div">
                {selectedFriend?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedFriend.status || "Статус отсутствует"}
              </Typography>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                }}
              >
                <Link to={`/messages/${selectedFriend.id}`}>
                  <IconButton>
                    <Message sx={{ fontSize: 25, padding: "5px" }} />
                  </IconButton>
                </Link>
              </Grid>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default FriendProfile;
