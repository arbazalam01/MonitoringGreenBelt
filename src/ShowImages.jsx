import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase";
import {
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { update, ref } from "firebase/database";
import useStyles from "./imgStyle";

function ShowImages({ imgRef, imgKey }) {
  const isGreen = imgRef.isGreen;
  const imageUrl = imgRef.imageURL;
  const imgLat = imgRef.Lattitude;
  const imgLong = imgRef.Longitude;
  const [value, setValue] = useState(isGreen);
  const classes = useStyles();

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  async function downloadImage() {
    const image = await fetch(imageUrl);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  useEffect(() => {
    const updates = {};
    updates["/images/" + imgKey] = { imageURL: imageUrl, isGreen: value };
    update(ref(db), updates);
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={imageUrl} alt="drone-img" className={classes.img} />
      <div className={classes.content}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="CheckGreen"
            value={value}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            <FormControlLabel value={true} control={<Radio />} label="Green" />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Not Green"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "auto", display: "flex" }}>
        <p>Lattitude: {imgLat}</p>
        <p style={{ marginLeft: "5px" }}>Longitude: {imgLong}</p>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Button onClick={downloadImage}>Download</Button>
      </div>
    </div>
  );
}

export default ShowImages;
