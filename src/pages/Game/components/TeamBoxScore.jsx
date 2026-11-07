import TeamScore from "../../../components/BoxScore/TeamScore";


const TeamBoxScore = () => {
  return(
    <div className="team-score-container">
      {/* MAIN TITLE  */}
      <span className="team-main-title">Miami Heat</span>

      <TeamScore />
    </div>
  )
}

export default TeamBoxScore;