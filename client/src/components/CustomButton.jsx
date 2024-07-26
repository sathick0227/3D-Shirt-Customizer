import React from "react";
import { useSnapshot } from "valtio";

import state from "../store";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({
  title,
  type,
  customStyles,
  handleClick,
  disabled,
  selected,
}) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (disabled) {
      return {
        backgroundColor: "lightgrey",
        cursor: "not-allowed",
      };
    } else {
      if (selected) {
        return {
          border: "2px solid black",
        };
      }
      if (type === "filled") {
        return {
          backgroundColor: snap.color,
          color: getContrastingColor(snap.color),
        };
      } else if (type === "outline") {
        return {
          borderWidth: "1px",
          borderColor: snap.color,
          color: snap.color,
        };
      }
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CustomButton;
