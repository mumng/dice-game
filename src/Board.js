// import logo from './logo.svg';
// import './App.css';

import Dice from './Dice';
import './Board.css';

function Board({ name, color, num, score, history }) {
  return (
    <div className="Board">
      <h2> {name} </h2>
      <Dice color={color} num = {num-1}/>
      <h2> 총점 </h2>
        <p> {score} </p>
      <h2> 기록 </h2>
        <p> {history.join(',')} </p>
    </div>
  ); 
}

export default Board;
