import PlayerBoxScore from "../../../components/BoxScore/PlayerBoxScore";
import TeamScore from "../../../components/BoxScore/TeamScore";



const TeamBoxScore = ({game}) => {
  console.log(game)

  return(
    <div className="team-score-container">
      {/* MAIN TITLE  */}
      <span className="team-main-title">Miami Heat</span>

      <TeamScore />

      <span className="player-box-title">Starters</span>

      <PlayerBoxScore homeTeam={game.homeTeam} type={"starters"}/>

      <span className="player-box-title">Bench</span>

      <PlayerBoxScore homeTeam={game.homeTeam} type={"bench"}/>
    </div>
  )
}

export default TeamBoxScore;