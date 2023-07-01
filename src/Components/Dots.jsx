import React from "react";

export default function Dots(props) {
  let dotArray = [];
  for (let i = 0; i < props.count; i++) {
    dotArray.push(<div className="dot"></div>);
  }

  return <>{dotArray}</>;
}
