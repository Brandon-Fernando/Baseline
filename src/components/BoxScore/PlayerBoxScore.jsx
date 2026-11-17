import { PLAYER_STAT_KEY } from "../../data/player";

const PlayerBoxScore = () => {
  const temp = [1, 2, 3, 4, 5];
  const statTemp = [1, 2, 3, 4, 4, 2, 3, 4, 2];

  return (
    <div className="player-box-score">
      <div className="player-scores-scroll">
        {temp.map((player) => (
          <div className="player-stats-wrapper" key={player}>
            <div className="player-headshot-name">
              <div className="player-headshot" />
              <span>B. Adebayo</span>
            </div>

            <div className="player-stats">
              {statTemp.map((stat, index) => (
                <div className="player-stat-value" key={index}>
                  <span className="stat-label">PTS</span>
                  <span className="stat-val">67</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerBoxScore;