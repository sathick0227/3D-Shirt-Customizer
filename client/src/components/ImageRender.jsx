import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Grid, Typography } from "@mui/material";

export default function ImageRender(props) {
  const { array, setValue, value } = props;
  return (
    <Grid container mt={4} display="flex" justifyContent="space-evenly">
      {array.map((img, inx) => (
        <Grid item key={inx}>
          <div style={{ position: "relative" }}>
            <img
              src={img.url}
              alt={inx}
              onClick={() => setValue(img.name)}
              className={
                value === img.name ? "active genderImage" : "genderImage"
              }
            />
            {value === img.name && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "black",
                  fontWeight: 800,
                  pointerEvents: "none",
                }}
              >
                <CheckIcon fontSize="large" />
              </span>
            )}
          </div>

          <h6
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {img.name}
          </h6>
        </Grid>
      ))}
    </Grid>
  );
}
