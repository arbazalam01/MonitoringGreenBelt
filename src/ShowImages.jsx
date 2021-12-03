import React, { useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

function ShowImages({ imgRef }) {
  const imgData = imgRef[Object.keys(imgRef)[0]];
  const isGreen = imgData.isGreen;
  const imageUrl = imgData.imageURL;
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
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  // useEffect(() => {
  //   imgRef.child(imgRef).update({
  //     isGreen: value,
  //   });
  // }, [value]);
  // console.log(ref(db,imgRef));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img src={imageUrl} alt="drone-img" height="300" width="300" />

      <FormControl component="fieldset">
        <FormLabel component="legend">Tick if Green</FormLabel>
        <RadioGroup
          row
          aria-label="CheckGreen"
          value={value}
          onChange={handleChange}
          name="radio-buttons-group"
        >
          <FormControlLabel value={true} control={<Radio />} label="isGreen" />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label="NotGreen"
          />
        </RadioGroup>
      </FormControl>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
}

export default ShowImages;
