import { useState } from "react";
import Score from "./components/Score";
import ToggleBar from "./components/ToggleBar";
import "./Game.css";

const OPTIONS = ["Heat", "Warriors", "Play By Play", "Team Comparison"];

const Game = () => {
  const [option, setOption] = useState("Heat");
  

  return (
    <div className="game-container">
      {/* SCORE  */}
      <Score />

      {/* TOGGLE  */}
      <ToggleBar 
        option={option}
        options={OPTIONS}
        setOption={setOption}
      />

      {/* TOGGLE CONTENT  */}
    </div>
  )
}

export default Game;