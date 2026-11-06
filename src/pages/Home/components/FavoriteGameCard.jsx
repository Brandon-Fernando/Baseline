import { teams } from "../../../data/team";

function formatImg(team){
  return team.toLowerCase().trim().replace(/\s+/g, "_");
}

function getGradient(team){
  const currentTeam = teams.find(
    (t) => String(t.id) === String(team.id)
  );

  return currentTeam.color
}

function formatTime(time){
    return new Date(time).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }


const FavoriteGameCard = ({game}) => {
  function getGameLabel(game) {
    const status = game.status?.trim() || "";
    const time = game.time?.trim() || "";

    if (game.postponed) return "Postponed";

    if (game.status_state === "final" || /^final/i.test(status)) {
      return status || "Final";
    }

    if (status.toLowerCase() === "halftime") {
      return "Halftime";
    }

    if (
      game.status_state === "scheduled" ||
      (!game.status_state && game.period === 0)
    ) {
      return game.datetime ? formatTime(game.datetime) : status;
    }

    // Append time only when it looks like a game clock.
    // Otherwise, preserve the API's status text.
    const hasClock = /^\d+:\d{2}(?:\.\d+)?$/.test(time);

    return hasClock ? time : status || "Time unavailable";
  }

  console.log("FaveGame", game)
  const home = game.home_team;
  const away = game.visitor_team
  const homeGradient = getGradient(home);
  const awayGradient = getGradient(away)

  const isScheduled = game.status_state === "scheduled";
  const isLive = game.status_state === "in_progress";

  return(
    // {/* FAVORITE TEAM  */}
    <div className="favorite-team-card">
      <div 
        className="fav-team-card-gradient"
        style={{ "--home-color": homeGradient, "--away-color": awayGradient }}
      />

      {/* FAVORITE TEAM  */}
      <div className="team-sides">
        <img src={`/NBA-Teams/${formatImg(home.full_name)}.png`} alt="fav-team" className="fav-team-logo"/>

        <span className="fav-team-names">{home.name}</span>
        
        {/* <span className="record">1-4</span> */}
      </div>
      
      {/* TIME  */}
      <div className={`fav-card-time ${isScheduled ? "scheduled" : ""}`}>
        <span className="day-qtr">Today</span>

        {game.time !== "Half" && (
          <span className={`game-status-fav ${isScheduled ? "scheduled" : ""}`}>{getGameLabel(game)}</span>
        )}

        {(isLive && !game.time.startsWith("END")) && (
          <span className="time"> {game.time?.replace(/^Q[1-4]\s*[·:\-]?\s*/i, "").trim()}</span>
        )}


      </div>

      {/* <span className="at-vs">@</span> */}

      {/* OPPOSING TEAM  */}
      <div className="team-sides">
        <img src={`/NBA-Teams/${formatImg(away.full_name)}.png`} alt="opposing-team" className="fav-team-logo"/>

        <span className="fav-team-names">{away.name}</span>

        {/* <span className="record">1-4</span> */}
      </div>
    </div>
  )
}

export default FavoriteGameCard