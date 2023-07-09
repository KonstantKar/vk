import { Button, Card, Chip } from "@mui/material";
import { Avatar } from "antd";
import React, { FC } from "react";
import useAuth from "../../providers/useAuth";
import { signOut } from "firebase/auth";

const User: FC = () => {
  const { user, auth } = useAuth();
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 1,
        backgroundColor: "#F1F7FA",
        marginBottom: 3,
      }}
    >
      <Chip
        avatar={<Avatar alt="Natacha" src={user?.avatar} />}
        label={user?.name || "Аноним"}
        variant="outlined"
      />

      <Button onClick={() => signOut(auth)}>Выйти</Button>
    </Card>
  );
};

export default User;
