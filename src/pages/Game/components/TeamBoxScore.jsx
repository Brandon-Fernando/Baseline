import PlayerBoxScore from "../../../components/BoxScore/PlayerBoxScore";
import TeamScore from "../../../components/BoxScore/TeamScore";


const TeamBoxScore = () => {
  return(
    <div className="team-score-container">
      {/* MAIN TITLE  */}
      <span className="team-main-title">Miami Heat</span>

      <TeamScore />

      <span className="player-box-title">Starters</span>

      <PlayerBoxScore />
    </div>
  )
}

export default TeamBoxScore;