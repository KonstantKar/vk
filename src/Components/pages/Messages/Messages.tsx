import React, { FC, useState, useEffect } from "react";
import useAuth from "../../providers/useAuth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { Message } from "../../../types";
import {
  Alert,
  Avatar,
  Card,
  CircularProgress,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";

const Messages: FC = () => {
  const { user, db } = useAuth();
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "messages"), orderBy("timestamp")),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
        setMessages(newMessages);
        setLoading(false);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const addMessageFunction = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        user: user,
        message: message,
        timestamp: serverTimestamp(), //в db отправляется время написания сообщения,и в useEffect сообщения фильтруются по времени
      });
    } catch (e: any) {
      setError(e);
    }
    setMessage("");
  };

  return (
    <>
      {error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error}
        </Alert>
      )}
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
        <Card
          variant="outlined"
          sx={{
            padding: 2,
            backgroundColor: "#F1F7FA",
            marginBottom: 3,
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5" className="header-message">
                Сообщения
              </Typography>
            </Grid>
          </Grid>
          <Grid container component={Paper}>
            <Grid item xs={12}>
              <List style={{ height: "64vh", overflow: "auto" }}>
                {messages.map((msg) => {
                  const messageKey = uuidv4();
                  return (
                    <ListItem key={messageKey}>
                      <Grid
                        container
                        sx={
                          msg.user.id === user?.id
                            ? { textAlign: "right", color: "#1976d2" }
                            : {}
                        }
                      >
                        <Grid
                          item
                          xs={12}
                          sx={
                            msg.user.id === user?.id
                              ? { display: "flex", justifyContent: "flex-end" }
                              : { justifyContent: "start" }
                          }
                        >
                          <Avatar
                            src={msg.user.avatar}
                            sx={{ width: "30", height: "30" }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText
                            secondary={msg.user.name}
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                          <ListItemText primary={msg.message}></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
              <Divider />
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Напишите сообщение..."
                    fullWidth
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                </Grid>
                <Grid item xs={1} sx={{ textAlign: "right" }}>
                  <Fab color="primary" onClick={addMessageFunction}>
                    <SendIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
    </>
  );
};

export default Messages;
