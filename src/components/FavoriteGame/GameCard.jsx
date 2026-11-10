import "./GameCard.css";
import { teams } from "../../data/team";
import { getGradient, formatImg, getGameLabel, formatGameDate, formatGameClock } from "../../pages/testGames";

function getImg(team){
  const currentTeam = teams.find(
    (t) => String(t.id) === String(team.teamId)
  )

  return currentTeam?.logo;
}

const GameCard = ({game}) => {
  const home = game.homeTeam;
  const away = game.awayTeam;

  const homeGradient = getGradient(home);
  const awayGradient = getGradient(away);

  const isScheduled = game.gameStatus === 1;
  const isLive = game.gameStatus !== 1;

  const ScheduledGame = () => {
    return(
      <>
        <div className="date-qtr">
          <span className="card-subtitle">{formatGameDate(game.gameDateEst)}</span>
          
          <span className="card-title">{game.gameStatusText}</span>
        </div>
      </>
    )
  }

  const LiveGame = () => {
    return(
      <>
        <div className={`date-qtr ${game.gameStatusText.startsWith("End") ? "end" : ""}`}>
          <span className="card-subtitle">{game.gameStatusText}</span>

          {!game.gameStatusText.startsWith("End") && (
            <span className="card-title">
              {formatGameClock(game.gameClock)}
            </span>
          )}  
        </div>  
      </>
    )
  }

  return(
    <div className="fav-card-container">
      {/* BACKGROUND GRADIENT  */}
      <div 
        className="fav-card-gradient-wrapper"
        style={{ "--home-color": homeGradient, "--away-color": awayGradient}}
      >
        <img src={getImg(home)} alt="gradinent-team" className="gradient-home-team"/>
        <img src={getImg(away)} alt="gradinent-team" className="gradient-away-team"/>
      </div>

      {/* TEAM  */}
      <div className={`card-teams ${isLive ? "live" : ""}`}>
        <div className="team-abr-img">
          <span className="team-abr">{home.teamTricode}</span>
          <img 
            src={getImg(home)}
            alt="HomeTeam" 
            className="team-img"
          />
        </div>

        {isLive && (
          <span className="score">{home.score}</span>
        )}
       
      </div>

      {isScheduled && (
        <ScheduledGame />
      )}

      {isLive && (
        <LiveGame />
      )}

      <div className={`card-teams ${isLive ? "live" : ""}`}>
        <div className="team-abr-img">
          <span className="team-abr">{away.teamTricode}</span>
          <img 
            src={getImg(away)}
            alt="HomeTeam" 
            className="team-img"
          />
        </div>

        {isLive && (
          <span className="score">{away.score}</span>
        )}
       
      </div>

    </div>
  )
}

export default GameCard;