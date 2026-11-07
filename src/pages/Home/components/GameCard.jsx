
// const GameCard = ({game, home, away}) => {
//   function formatImg(team){
//     return team.toLowerCase().trim().replace(/\s+/g, "_");
//   }

//   function formatTime(time){
//     return new Date(time).toLocaleTimeString([], {
//       hour: "numeric",
//       minute: "2-digit",
//     });
//   }

//   const isScheduled = game.status_state === "scheduled";
//   const isLive = game.status_state === "in_progress";
//   const isFinal = game.status_state === "final";
//   const isHalftime = game.status?.trim().toLowerCase() === "halftime";

//   function getGameLabel(game) {
//     const status = game.status?.trim() || "";
//     const time = game.time?.trim() || "";

//     if (game.postponed) return "Postponed";

//     if (game.status_state === "final" || /^final/i.test(status)) {
//       return status || "Final";
//     }

//     if (status.toLowerCase() === "halftime") {
//       return "Halftime";
//     }

//     if (
//       game.status_state === "scheduled" ||
//       (!game.status_state && game.period === 0)
//     ) {
//       return game.datetime ? formatTime(game.datetime) : status;
//     }

//     // Append time only when it looks like a game clock.
//     // Otherwise, preserve the API's status text.
//     const hasClock = /^\d+:\d{2}(?:\.\d+)?$/.test(time);

//     return hasClock ? time : status || "Time unavailable";
//   }

//   return(
//     <div className="game-card-container">
//       {/* HOME TEAM  */}
//       <div className="team-info">
//         <img src={`/NBA-Teams/${formatImg(home.full_name)}.png`} alt="team" className="team"/>

//         <span>{home.name}</span>
//       </div>

//       {/* TIME INFO  */}
//       <div className="score-time-container">
//         {/* HOME SCORE  */}
//         {!isScheduled && (
//           <span className="game-score">{game.home_team_score}</span>
//         )}
        
        
//         <div className="game-status">
//           {game.time !== "Half" && (
//             <span className={`game-status-main ${isScheduled ? "scheduled" : ""}`}>{getGameLabel(game)}</span>
//           )}
          

//           {(isLive && !game.time.startsWith("END")) && (
//             <span className="time"> {game.time?.replace(/^Q[1-4]\s*[·:\-]?\s*/i, "").trim()}</span>
//           )}
//         </div>
        

//         {/* AWAY SCORE  */}
//         {!isScheduled && (
//           <span className="game-score">{game.visitor_team_score}</span>
//         )}
//       </div>

//       <div className="team-info">
//         <img src={`/NBA-Teams/${formatImg(away.full_name)}.png`} alt="team" className="team"/>

//         <span>{away.name}</span>
//       </div>
//     </div>
//   )
// }

// export default GameCard;
import { teams } from "../../../data/team";

const GameCard = ({game, home, away}) => {

  function getImg(team){
    const currentTeam = teams.find(
      (t) => String(t.id) === String(team.teamId)
    )

    return currentTeam?.logo;
  }

  return(
    <div className="game-card-container">
      {/* HOME TEAM  */}
      <div className="team-info">
        <img src={getImg(home)} alt="team" className="team"/>

        <span>{home.teamName}</span>
      </div>

      {/* TIME INFO  */}

      <div className="team-info">
        <img src={getImg(away)} alt="team" className="team"/>

        <span>{away.teamName}</span>
      </div>
    </div>
  )
}

export default GameCard;