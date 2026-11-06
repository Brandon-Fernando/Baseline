

const Score = () => {
  return (
    <div className="score-card-container">
      <div className="score-card-gradient">
        <img src="/NBA-Teams/miami_heat.png" alt="gradient-team" className="gradient-home-score" />
        <img src="/NBA-Teams/golden_state_warriors.png" alt="gradient-team" className="gradient-away-score" />
      </div>

      {/* HOME TEAM */}
      <div className="score-team">
        <div className="score-team-info">
          <span className="score-name">Heat</span>
          <img src="/NBA-Teams/miami_heat.png" alt="gradient-team" className="score-img" />

        </div>

        <span className="scores">100</span>
      </div>

      {/* TIME */}
      <div className="score-time">
        <span className="card-subtitle">3rd Qtr</span>
        <span className="card-title">10:00</span>
      </div>

      {/* AWAY TEAM  */}
      <div className="score-team">
        <span className="scores">100</span>

        <div className="score-team-info">
          <span className="score-name">Warriors</span>
          <img src="/NBA-Teams/golden_state_warriors.png" alt="gradient-team" className="score-img" />
        </div>
      </div>
    </div>
  );
}

export default Score;