import React from "react";
import { useState, useEffect } from "react";
import { imgDataRef } from "./firebase";
import { onValue } from "firebase/database";
import { Grid } from "@mui/material";
import ShowImages from "./ShowImages";
import Header from "./Header";

function Home() {
  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    onValue(
      imgDataRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          setAllImages((prevState) => [...prevState, childSnapshot]);
        });
      },
      { onlyOnce: true }
    );
  }, []);
  // console.log(allImages);

  return (
    <div>
      <Header />

      <Grid container spacing={2}>
        {allImages.map((childData) => {
          const imgKey = childData.key;
          const imgRef = childData.val();
          return (
            <Grid item xs={4}>
              <ShowImages imgRef={imgRef} imgKey={imgKey} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
