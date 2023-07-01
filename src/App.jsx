import "./App.css";
import React from "react";
import Dice from "./Components/Dice";
import { nanoid } from "nanoid";
// import Confetti from "react-confetti";

function App() {
  const [dieValue, setDieValue] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [score, setScore] = React.useState({ score: 0, currentTime: 0 });
  const [bestTime, setBestTime] = React.useState(
    Number(JSON.parse(localStorage.getItem("bestTime"))) || 0
  );
  const [startTime, setStartTime] = React.useState(0);

  React.useEffect(() => {
    const allHeld = dieValue.every((die) => die.isHeld);
    const firstValue = dieValue[0].value;
    const allSameValues = dieValue.every((die) => die.value === firstValue);
    if (allHeld && allSameValues) {
      setTenzies(true);
      let time = new Date().getTime() - startTime;

      time = Math.ceil(time / 1000);
      console.log(time, startTime);
      setScore((prevScore) => ({ ...prevScore, currentTime: time }));
      if (time < bestTime) {
        localStorage.setItem("bestTime", JSON.stringify(time));
        setBestTime(Math.ceil(time));
      }
    }
  }, [dieValue]);

  const Dices = dieValue.map((die) => (
    <Dice
      value={die.value}
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      handleClick={dieClick}
    />
  ));

  function allNewDice() {
    let newDie = [];
    for (let i = 0; i < 10; i++) {
      newDie.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDie;
  }

  function dieClick(id) {
    setDieValue((prevValue) =>
      prevValue.map((dice) => ({
        ...dice,
        isHeld: dice.id === id ? !dice.isHeld : dice.isHeld,
      }))
    );
  }

  function handleClick() {
    if (!tenzies) {
      if (score.score === 1) {
        setStartTime(new Date().getTime());
        // console.log("time started", startTime);
      }
      setScore((prevScore) => ({ ...prevScore, score: prevScore.score + 1 }));
      setDieValue((oldValue) =>
        oldValue.map((die) =>
          die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              }
        )
      );
    } else {
      setScore({ score: 0, currentTime: 0 });
      setTenzies(false);
      setDieValue(allNewDice());
    }
  }

  return (
    <div>
      <main>
        {/* {tenzies && <Confetti />} */}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at it's
          current value between rolls
        </p>
        <div className="dice">{Dices}</div>
        <br />
        <button className="roll-button" onClick={handleClick}>
          {tenzies ? "Reset" : "Roll"}
        </button>
        <div className="score">
          Number of roles : <span className="big">{score.score}</span>
        </div>
        <div>Your time : {score.currentTime} seconds</div>
        <div>
          Best time: <span className="big">{bestTime || 0}</span> seconds
        </div>
      </main>
    </div>
  );
}

export default App;
