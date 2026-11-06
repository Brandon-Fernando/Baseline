import "./GameCard.css"

const GameCard = () => {

  return(
    <div className="fav-card-container">
      {/* BACKGROUND GRADIENT  */}
      <div className="fav-card-gradient-wrapper">
        <img src="/NBA-Teams/miami_heat.png" alt="gradinent-team" className="gradient-home-team"/>
        <img src="/NBA-Teams/golden_state_warriors.png" alt="gradinent-team" className="gradient-away-team"/>
      </div>

      {/* TEAM  */}
      <div className="card-teams">
        <div className="team-abr-img">
          <span className="team-abr">MIA</span>
          <img src="/NBA-Teams/miami_heat.png" alt="HomeTeam" className="team-img"/>
        </div>
      </div>

      <div className="date-qtr">
        <span className="card-subtitle">NOV 4</span>

        <span className="card-title">10:00PM</span>
      </div>

      <div className="card-teams">
        <div className="team-abr-img">
          <span className="team-abr">GSW</span>
          <img src="/NBA-Teams/golden_state_warriors.png" alt="AwayTeam" className="team-img" />
        </div>
      </div>

    </div>
  )
}

export default GameCard;