import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";

import useAuth from "../../providers/useAuth";

const Profile: FC = () => {
  const { user } = useAuth();
  const [profileStatus, setProfileStatus] = useState(
    "Всегда хотел стать программистом!!"
  );
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = () => {
    setEditMode(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus(newStatus);
    setEditMode(false);
    setNewStatus("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatus(e.target.value);
  };

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
          image="https://mobimg.b-cdn.net/v3/fetch/f5/f549deb89221c2d2b47b68f9eb360d12.jpeg"
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <img
              src={user?.avatar}
              alt=""
              style={{
                width: 250,
                height: 250,
                objectFit: "cover",
                marginRight: 20,
              }}
            />

            {editMode ? (
              <form onSubmit={handleFormSubmit}>
                <Typography gutterBottom variant="h5" component="div">
                  {user?.name}
                </Typography>
                <TextField
                  label="Новый статус"
                  value={newStatus}
                  onChange={handleInputChange}
                  fullWidth
                />
                <CardActions>
                  <Button type="submit" size="small">
                    Сохранить
                  </Button>
                </CardActions>
              </form>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileStatus || "Статус отсутствует"}
                </Typography>
                <CardActions>
                  <Button size="small" onClick={handleStatusChange}>
                    Изменить статус
                  </Button>
                </CardActions>
              </Box>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Profile;
