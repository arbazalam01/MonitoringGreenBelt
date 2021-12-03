import React from "react";
import { AppBar, Typography } from "@mui/material";
import useStyles from "./styles.js";

function Header() {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Monitoring Green Belt
        </Typography>
      </AppBar>
    </div>
  );
}

export default Header;
