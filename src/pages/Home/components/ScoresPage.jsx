
const ScoresPage = () => {

  return(
    <div className="scores-page-container">
      {/* FAVORITE TEAM  */}
      <div className="favorite-team-card">
        <div 
          className="fav-team-card-gradient"
        />
        {/* FAVORITE TEAM  */}
        <div className="team-sides">
          <img src="/NBA-Teams/miami_heat.png" alt="fav-team" className="fav-team-logo"/>

          <span className="fav-team-names">Heat</span>
          
          <span className="record">1-4</span>
        </div>
        
        {/* TIME  */}
        <div className="fav-card-time">
          <span className="day-qtr">Today</span>
          <span className="time">12:00 PM</span>
        </div>

        <span className="at-vs">@</span>

        {/* OPPOSING TEAM  */}
        <div className="team-sides">
          <img src="/NBA-Teams/golden_state_warriors.png" alt="opposing-team" className="fav-team-logo"/>

          <span className="fav-team-names">Warriors</span>

          <span className="record">1-4</span>
        </div>
      </div>
    </div>
  )
}

export default ScoresPage;