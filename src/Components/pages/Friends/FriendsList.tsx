import React, { FC, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Call, Message, PersonAdd } from "@mui/icons-material";
import { collection, onSnapshot } from "firebase/firestore";
import useAuth from "../../providers/useAuth";
import { User } from "../../../types";

const FriendList: FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const { db } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "friends"), (snapshot) => {
      const newFriends = snapshot.docs.map((doc) => doc.data() as User);
      setFriends(newFriends);
      setLoading(false);
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
        <Grid>
          {friends.map((fr) => (
            <>
              <Box>
                <Grid
                  item
                  xs={7}
                  sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <PersonAdd sx={{ fontSize: 25, padding: "5px" }} />
                    <Message sx={{ fontSize: 25, padding: "5px" }} />
                    <Call sx={{ fontSize: 25, padding: "5px" }} />
                  </Grid>
                  <CardContent>
                    <Box sx={{ display: "flex" }}>
                      <Avatar
                        src={fr.avatar}
                        alt=""
                        style={{
                          width: 100,
                          height: 100,
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
                          {fr?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {fr?.status || "Статус отсутствует"}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Grid>
              </Box>
              <Divider />
            </>
          ))}
        </Grid>
      )}
    </Card>
  );
};

export default FriendList;
