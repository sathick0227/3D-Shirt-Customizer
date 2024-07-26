import React from "react";
import { CirclePicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div>
      <CirclePicker
        style={{ border: "2px solid black" }}
        color={snap.color}
        onChange={(color) => (state.color = color.hex)}
        colors={["#000000", "#90ee90", "#800080", "#FCFBF4"]}
      />
    </div>
  );
};

export default ColorPicker;
