import React from "react";

import CustomButton from "./CustomButton";
import { Button, Grid, Typography } from "@mui/material";
import state from "../store";

const FilePicker = ({ file, setFile, readFile, activeFilterTab }) => {
  const handleSide = () => {
    if (state.defaultSide === "front") {
      state.defaultSide = "back";
      state.size = 15.66668701171875;
    } else {
      state.defaultSide = "front";
      state.size = 0;
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "A4F":
        state.isLogoTextureFront = true;
        state.isBoxTextureFront = false;
        state.isSmallLogoTextureFront = false;
        break;
      case "A4B":
        state.isLogoTextureBack = true;
        state.isBoxTextureBack = false;
        break;
      case "BOXF":
        state.isLogoTextureFront = false;
        state.isBoxTextureFront = true;
        state.isSmallLogoTextureFront = false;
        break;
      case "BOXB":
        state.isLogoTextureBack = false;
        state.isBoxTextureBack = true;
        break;
      case "CHEST":
        state.isLogoTextureFront = false;
        state.isBoxTextureFront = false;
        state.isSmallLogoTextureFront = true;
        break;
      default:
        state.isLogoTextureFront = false;
        state.isLogoTextureBack = false;
        state.isBoxTextureFront = false;
        state.isBoxTextureBack = false;
        state.isSmallLogoTextureFront = false;
        break;
    }
  };

  return (
    <div>
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <Grid>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                border: "1px solid black",
                color: "black",
              },
            }}
            onClick={() => handleSide()}
          >
            {state.defaultSide === "front" ? "Back" : "Front"}
          </Button>
        </Grid>
        {file.length !== 0 && (
          <div>
            {state.defaultSide === "front" ? (
              <>
                <CustomButton
                  type="filled"
                  title="A4-Front"
                  handleClick={() => {
                    handleActiveFilterTab("A4F");
                    readFile("A4F");
                  }}
                  customStyles="text-xs"
                  // disabled={true}
                />{" "}
                <CustomButton
                  type="filled"
                  title="Thumbnail-Front"
                  handleClick={() => {
                    handleActiveFilterTab("BOXF");
                    readFile("BOXF");
                  }}
                  customStyles="text-xs"
                />{" "}
                <CustomButton
                  type="filled"
                  title="Chest-Front"
                  handleClick={() => {
                    handleActiveFilterTab("CHEST");
                    readFile("CHEST");
                  }}
                  customStyles="text-xs"
                />
              </>
            ) : (
              <>
                <CustomButton
                  type="filled"
                  title="A4-Back"
                  handleClick={() => {
                    handleActiveFilterTab("A4B");
                    readFile("A4B");
                  }}
                  customStyles="text-xs"
                />{" "}
                <CustomButton
                  type="filled"
                  style={{ marginLeft: "10px" }}
                  title="Thumbnail-Back"
                  handleClick={() => {
                    handleActiveFilterTab("BOXB");
                    readFile("BOXB");
                  }}
                  customStyles="text-xs"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePicker;
