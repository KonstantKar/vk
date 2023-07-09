import React, { FC } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Grid } from "@mui/material";
import useAuth from "../providers/useAuth";

interface LayoutProps {
  children: any;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={5} marginTop={2}>
        {user && (
          <Grid item md={2}>
            <Sidebar />
          </Grid>
        )}
        <Grid item md={user ? 8 : 12}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
