import React from "react";
import { AppBar, Typography } from "@mui/material";
import useStyles from "./styles.js";
import { useAuth } from "./contexts/AuthContext";
import { Button } from "react-bootstrap";
import { init } from "emailjs-com";

function Header() {
  const { logout } = useAuth();
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.navBar}>
          <Typography className={classes.heading} variant="h2" align="center">
            Monitoring Green Belt
          </Typography>
          <div className={classes.logOut}>
            <Button onClick={logout}>Logout</Button>
          </div>
          <div className={classes.logOut}>
            <Button>Email Images</Button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
