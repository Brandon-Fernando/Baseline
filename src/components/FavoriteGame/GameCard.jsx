import "./GameCard.css";
import { getGradient, formatImg, getGameLabel, formatGameDate } from "../../pages/testGames";

const GameCard = ({game}) => {
  const home = game.home_team;
  const away = game.visitor_team;
  console.log(game)

  const homeGradient = getGradient(home);
  const awayGradient = getGradient(away);

  const isScheduled = game.status_state === "scheduled";
  const isLive = game.status_state === "in_progress";

  const label = getGameLabel(game);
  console.log(label);

  const ScheduledGame = () => {
    return(
      <>
        <div className="date-qtr">
          <span className="card-subtitle">{formatGameDate(game.date)}</span>

          <span className="card-title">{label}</span>
        </div>
      </>
    )
  }

  const LiveGame = () => {
    return(
      <>
        <div className="date-qtr">
          {(game.time !== "Half" && !game.time.startsWith("END")) &&(
            <span className="card-subtitle">{getGameLabel(game)}</span>
          )}
         
          {/* {!game.time.startsWith("END") && } */}
          <span className="card-title">{game.time?.replace(/^Q[1-4]\s*[·:\-]?\s*/i, "").trim()}</span>
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
        <img src={`/NBA-Teams/${formatImg(home.full_name)}.png`} alt="gradinent-team" className="gradient-home-team"/>
        <img src={`/NBA-Teams/${formatImg(away.full_name)}.png`} alt="gradinent-team" className="gradient-away-team"/>
      </div>

      {/* TEAM  */}
      <div className={`card-teams ${isLive ? "live" : ""}`}>
        <div className="team-abr-img">
          <span className="team-abr">{home.abbreviation}</span>
          <img 
            src={`/NBA-Teams/${formatImg(home.full_name)}.png`}
            alt="HomeTeam" 
            className="team-img"
          />
        </div>

        {isLive && (
          <span className="score">{game.home_team_score}</span>
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
          <span className="team-abr">{away.abbreviation}</span>
          <img 
            src={`/NBA-Teams/${formatImg(away.full_name)}.png`}
            alt="HomeTeam" 
            className="team-img"
          />
        </div>

        {isLive && (
          <span className="score">{game.visitor_team_score}</span>
        )}
       
      </div>

    </div>
  )
}

export default GameCard;