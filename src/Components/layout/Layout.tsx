import React, { FC } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import useAuth from "../providers/useAuth";

import Footer from "./footer/Footer";

interface LayoutProps {
  children: any;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <>
      <Header />
      {!isSmallScreen ? (
        <Grid container spacing={2} paddingX={30} marginTop={2}>
          {user && (
            <Grid item md={2}>
              <Sidebar />
            </Grid>
          )}
          <Grid item md={isSmallScreen || !user ? 12 : 9}>
            {children}
          </Grid>
          {isSmallScreen && <Grid item md={12}></Grid>}
        </Grid>
      ) : (
        <>
          <Grid container spacing={2} paddingX={5} marginTop={2}>
            <Grid item md={isSmallScreen || !user ? 12 : 9}>
              {children}
            </Grid>
          </Grid>
          {isSmallScreen && user && <Footer />}
        </>
      )}
    </>
  );
};

export default Layout;
