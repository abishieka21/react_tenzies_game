import React from "react";
import Dots from "./Dots";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      style={styles}
      className="dice-face"
      onClick={() => props.handleClick(props.id)}
    >
      <Dots count={props.value} />
    </div>
  );
}
