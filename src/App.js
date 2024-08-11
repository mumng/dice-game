import Board from "./Board";
import { useState } from "react";
import Button from "./Button";
import "./App.css";

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  const [num, setNum] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [winner, setWinner] = useState(2);

  const [otherNum, setOtherNum] = useState(1);
  const [otherScore, setOtherScore] = useState(0);
  const [otherHistory, setOtherHistory] = useState([]);

  const nameList = {
    0: "정재영 승!",
    1: "이지영 승!",
    2: "무승부",
  };

  function handleRollClick() {
    const nextNum = random(6);
    const nextOtherNum = random(6);

    if (nextNum > nextOtherNum) setWinner(0);
    if (nextNum < nextOtherNum) setWinner(1);
    if (nextNum === nextOtherNum) setWinner(2);

    setNum(nextNum);
    setScore(score + nextNum);
    setHistory([...history, nextNum]);

    setOtherNum(nextOtherNum);
    setOtherScore(otherScore + nextOtherNum);
    setOtherHistory([...otherHistory, nextOtherNum]);
  }

  function handleRollClear() {
    setNum(1);
    setScore(0);
    setHistory([]);

    setOtherNum(1);
    setOtherScore(0);
    setOtherHistory([]);
  }

  return (
    <>
      <div className="App">
        <h2>Dice Game</h2>
        <Button className="App-button" color="blue" onClick={handleRollClick}>
          {" "}
          Try{" "}
        </Button>
        <Button className="App-button" color="red" onClick={handleRollClear}>
          {" "}
          Clear{" "}
        </Button>
      </div>
      <div className="Boards">
        <Board
          name="정재영"
          color="blue"
          num={num}
          score={score}
          history={history}
        />
        <Board
          name="이지영"
          color="red"
          num={otherNum}
          score={otherScore}
          history={otherHistory}
        />
        <p>{nameList[winner]} </p>
      </div>
    </>
  );
}

export default App;
