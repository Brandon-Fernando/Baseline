import { teams } from "../../../data/team";
import { formatGameClock } from "../../testGames";

const GameCard = ({game, home, away}) => {

  function getImg(team){
    const currentTeam = teams.find(
      (t) => String(t.id) === String(team.teamId)
    )

    return currentTeam?.logo;
  }



  return(
    <div className={`game-card-container ${game.gameStatus !== 1 ? "live" : ""}`}>
      {/* HOME TEAM  */}
      <div className="team-info-wrapper">
        <div className="team-info">
          <img src={getImg(home)} alt="team" className="team"/>

          <span>{home.teamName}</span>
        </div>
        
        {game.gameStatus !== 1 && (
          <span className="game-card-score">{home.score}</span>
        )}
      </div>

      {/* TIME INFO  */}
      <div className="game-card-status">
        {game.gameStatus === 1 && (
          <span className="game-time-sched">{game.gameStatusText}</span>
        )}

        {(game.gameStatus === 2 || game.gameStatus === 3) && (
          <>
            <span className="card-subtitle">
              {game.gameStatusText}
            </span>

            {!game.gameStatusText.startsWith("End") && (
              <span className="card-title">
                {formatGameClock(game.gameClock)}
              </span>
            )}  
          </>
        )}
      </div>  
      
      {/* AWAY TEAM  */}
      <div className="team-info-wrapper">
        {game.gameStatus !== 1 && (
          <span className="game-card-score">{away.score}</span>
        )}

        <div className="team-info">
          <img src={getImg(away)} alt="team" className="team"/>

          <span>{away.teamName}</span>
        </div>
       
      </div>
    </div>
  )
}

export default GameCard;