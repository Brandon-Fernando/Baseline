import "./BoxScore.css";
import { teamBoxScoreData } from "../../pages/Game/data/boxScoreData";

const TeamScore = () => {

  return(
    <div className="team-score-summary">
      <div className="team-score-gradient">
        <img src="/NBA-Teams/miami_heat.png" alt="Miami Heat"/>
      </div>

      {teamBoxScoreData.map((data) => (
        <div className="team-data">
          
        </div>
      ))}
    </div>
  )
}

export default TeamScore;