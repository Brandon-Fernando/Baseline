import { useState } from "react";
import Score from "./components/Score";
import ToggleBar from "./components/ToggleBar";
import "./Game.css";
import TeamBoxScore from "./components/TeamBoxScore";

const OPTIONS = ["Heat", "Warriors", "Play By Play", "Team Comparison"];

const Game = () => {
  const [option, setOption] = useState("Heat");


  async function testPlayByPlay() {
  const response = await fetch(
    "/nba/static/json/liveData/playbyplay/playbyplay_0022600025.json"
  );

  console.log("HTTP status:", response.status);

  const body = await response.text();

  if (!response.ok) {
    console.error(body);
    return;
  }

  const data = JSON.parse(body);
  console.table(data.game.actions);
}

testPlayByPlay().catch(console.error);
  

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
      <TeamBoxScore />
    </div>
  )
}

export default Game;