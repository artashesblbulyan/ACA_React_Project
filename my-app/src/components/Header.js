import React, { useState } from "react";
import { BoxPropsContext } from "../context/BoxPropsContext,js";
// import TextField from "@mui/material/TextField";
// import { BoxPropsContext } from "../context/BoxPropsContext,js";

export default function Box() {
  const theme = React.useContext(BoxPropsContext);
  const [inputColor, setInputColor] = useState("");

  const onChangeInputColor = (e) => {
    setInputColor(e.target.value);
  };

  return (
    <>
      <div
        style={{
          width: 150,
          height: 150,
          backgroundColor: theme.color,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
        <input type="text" onChange={onChangeInputColor}></input>
        <button onClick={() => theme.updateColor(inputColor)}>
          {" "}
          Change color
        </button>
      </div>
    </>
  );
}

