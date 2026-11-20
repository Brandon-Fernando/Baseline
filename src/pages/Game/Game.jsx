import { useState, useEffect } from "react";
import Score from "./components/Score";
import ToggleBar from "./components/ToggleBar";
import "./Game.css";
import TeamBoxScore from "./components/TeamBoxScore";
import { useParams } from "react-router-dom";

const OPTIONS = ["Heat", "Warriors", "Play By Play", "Team Comparison"];

const Game = () => {
  const { gameId } = useParams();
  const [option, setOption] = useState("Heat");
  const [game, setGame] = useState();

  useEffect(() => {
  const controller = new AbortController();

  async function testPlayByPlay() {
    try {
      const response = await fetch(
      `/nba-live/static/json/liveData/boxscore/boxscore_${gameId}.json`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setGame(data.game);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }

  testPlayByPlay();

  return () => controller.abort();
}, []);
  

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
      {game && <TeamBoxScore game={game} />}
    </div>
  )
}

export default Game;