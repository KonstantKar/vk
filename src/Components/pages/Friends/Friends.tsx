import React, { FC } from "react";
import AddFriend from "./AddFriend";
import FriendList from "./FriendsList";
import { Grid } from "@mui/material";

const Friends: FC = () => {
  return (
    <Grid container spacing={2} paddingX={5} marginTop={2}>
      <Grid item md={9}>
        <FriendList />
      </Grid>
      <Grid item md={3}>
        <AddFriend />
      </Grid>
    </Grid>
  );
};

export default Friends;
