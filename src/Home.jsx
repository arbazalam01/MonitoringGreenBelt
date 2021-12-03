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
    onValue(imgDataRef, (snapshot) => {
      const data = snapshot.val();
      // setAllImages((prevState) => [...prevState, data[Object.keys(data)[0]]]);
      console.log(data);
      setAllImages((prevState) => [...prevState, data]);
    });
  }, []);
  // console.log(allImages);

  return (
    <div>
      <Header />

      <Grid container spacing={2}>
        {allImages.map((imgRef) => {
          return (
            <Grid item xs={4}>
              <ShowImages imgRef={imgRef} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
