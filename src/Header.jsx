import React, { useState } from "react";
import { AppBar, Typography } from "@mui/material";
import useStyles from "./styles.js";
import { useAuth } from "./contexts/AuthContext";
import { Button } from "react-bootstrap";
import emailjs, { init } from "emailjs-com";

function Header({ imgData }) {
  const [loading, setLoading] = useState(false);
  init("user_aGUGJF5uKL2wb5NLjsM6D");
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const classes = useStyles();

  const sendEmail = async () => {
    setLoading(true);
    let str = "";
    let index = 1;
    Object.entries(imgData).forEach(([key, value]) => {
      if (!value.isGreen) {
        str += `${index}.${value.imageURL}\n`;
        index += 1;
      }
    });
    const data = {
      to_email: currentUser.email,
      message: str,
    };
    try {
      await emailjs.send("service_z2z0vss", "template_nhx5ahf", data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.navBar}>
          <Typography className={classes.heading} variant="h2" align="center">
            Monitoring Green Belt
          </Typography>

          <div className={classes.logOut}>
            <Button disabled={loading} onClick={sendEmail}>
              Send Images
            </Button>
            <p>
              To this email: <b>{currentUser.email}</b>{" "}
            </p>
          </div>
          <div className={classes.logOut}>
            <Button onClick={logout}>Logout</Button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
