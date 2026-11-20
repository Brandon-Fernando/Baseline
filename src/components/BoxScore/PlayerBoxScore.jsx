import { PLAYER_STAT_KEY } from "../../data/player";

function PlayerHeadshot({ playerId, name }) {
  return (
    <img
      src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`}
      alt={name}
      width={46}
      style={{ objectFit: "cover" }}
    />
  );
}

const PlayerBoxScore = ({homeTeam, type}) => {

  
  const starters = (homeTeam?.players ?? []).filter(
    (player) => String(player.starter) === "1"
  );
  
  const bench = (homeTeam?.players ?? []).filter(
    (player) => String(player.starter) === "0"
  )

  const players = type === "starters" ? starters : bench;


  return (
    <div className="player-box-score">
      <div className="player-scores-scroll">
        {players.map((player) => (
          <div className="player-stats-wrapper" key={player}>
            <div className="player-headshot-name">
              <div className="player-headshot">
                <PlayerHeadshot playerId={player.personId}/>
              </div>
              <span className="player-name">{player.nameI}</span>
            </div>

            <div className="player-stats">
              {PLAYER_STAT_KEY.map((stat, index) => (
                <div className="player-stat-value" key={index}>
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-val">
                    {stat.render
                      ? stat.render(player.statistics ?? {})
                      : player.statistics?.[stat.key] ?? "—"}
                  </span>
                </div>
              ))}
            </div>

            <hr className="line-divide"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerBoxScore;