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
    // "/nba/static/json/liveData/playbyplay/playbyplay_0022600025.json"
    // "/nba/static/json/liveData/boxscore/boxscore_0022600191.json"
    // "/nba/static/json/liveData/scoreboard/todaysScoreboard_00.json"
    "/nba-stats/stats/scoreboardv3?GameDate=2026-11-5&LeagueID=00"
    
  );

  console.log("HTTP status:", response.status);

  const body = await response.text();

  if (!response.ok) {
    console.error(body);
    return;
  }

  const data = JSON.parse(body);
  // console.log(data)
  // console.table(data.game.actions);
  console.log(data)
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