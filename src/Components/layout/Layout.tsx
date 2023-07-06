import React, { FC } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Grid } from "@mui/material";

interface LayoutProps {
  children: any;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Grid container spacing={2} paddingX={5} marginTop={2}>
        <Grid item md={2}>
          <Sidebar />
        </Grid>
        <Grid item md={8}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default Layout;
