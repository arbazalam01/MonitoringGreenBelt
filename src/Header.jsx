import React, { useState } from "react";
import { AppBar, Typography } from "@mui/material";
import useStyles from "./styles.js";
import { useAuth } from "./contexts/AuthContext";
import { Button } from "react-bootstrap";
import emailjs, { init } from "emailjs-com";
// import { useAuth } from "./contexts/AuthContext";

function Header({ imgData }) {
  const [loading, setLoading] = useState(false);
  init("user_iRSIk9h3Ibe10IBGxCshv");
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const classes = useStyles();
  // console.log(Object.values(imgData));

  const sendEmail = async () => {
    setLoading(true);
    let str = "";
    Object.entries(imgData).forEach(
      ([key, value], index) => (str += `${index + 1}.${value.imageURL}\n`)
    );
    const data = {
      to_email: currentUser.email,
      message: str,
    };
    try {
      await emailjs.send("service_o0d4j8m", "template_v2qqd9g", data);
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
            <Button onClick={logout}>Logout</Button>
          </div>
          <div className={classes.logOut}>
            <Button disabled={loading} onClick={sendEmail}>
              Email Images
            </Button>
          </div>
        </div>
      </AppBar>
    </div>
  );
}

export default Header;
