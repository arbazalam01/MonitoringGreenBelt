import React from "react";
import { useState, useEffect } from "react";
import { imgDataRef } from "./firebase";
import { onValue, get } from "firebase/database";
import { Grid } from "@mui/material";
import ShowImages from "./ShowImages";
import Header from "./Header";

function Home() {
  const [allImages, setAllImages] = useState({});
  useEffect(() => {
    // onValue(
    //   imgDataRef,
    //   (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //       setAllImages((prevState) => [...prevState, childSnapshot]);
    //     });
    //   },
    //   { onlyOnce: true }
    // );
    get(imgDataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllImages(snapshot.val());
        } else {
          console.log("No data");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header imgData={allImages} />

      <Grid container spacing={2}>
        {Object.entries(allImages).map(([key, value]) => {
          return (
            <Grid item xs={4}>
              <ShowImages imgRef={value} imgKey={key} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
