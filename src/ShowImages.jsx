import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "./firebase";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Button } from "react-bootstrap";
import { update, ref } from "firebase/database";

function ShowImages({ imgRef, imgKey }) {
  const isGreen = imgRef.isGreen;
  const imageUrl = imgRef.imageURL;
  const [value, setValue] = useState(isGreen);

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
      <img
        src={imageUrl}
        alt="drone-img"
        height="300"
        width="300"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "20px",
        }}
      />
      <div style={{ marginRight: "auto", marginLeft: "auto" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Tick if Green</FormLabel>
          <RadioGroup
            row
            aria-label="CheckGreen"
            value={value}
            onChange={handleChange}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="isGreen"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="NotGreen"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <Button onClick={downloadImage}>Download</Button>
      </div>
    </div>
  );
}

export default ShowImages;
