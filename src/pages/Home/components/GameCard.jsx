
const GameCard = () => (
  <div className="game-card-container">
    {/* HOME TEAM  */}
    <div className="team-info">
      <img src="/NBA-Teams/new_york_knicks.png" alt="team" className="team"/>

      <span>knicks</span>
    </div>

    {/* TIME INFO  */}
    <div className="game-card-times">
      <span>10:00 PM</span>

    </div>

     <div className="team-info">
      <img src="/NBA-Teams/philadelphia_76ers.png" alt="team" className="team"/>

      <span>76ers</span>
    </div>
  </div>
)

export default GameCard;