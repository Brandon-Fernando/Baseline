import { getNextTeamGame } from "../../testGames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCarousel from "../../../components/GameCarousel/GameCarousel";



const FavoriteGames = () => {
  const navigate = useNavigate();

  const [teamIds] = useState(() =>
    JSON.parse(localStorage.getItem("favoriteTeams") || "[]")
  );

  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    async function loadGames() {
      try {
        const results = await Promise.all(
          teamIds.map(async (teamId) => ({
            teamId,
            game: await getNextTeamGame(teamId),
          }))
        );

        if (!cancelled) {
          setGames(results);
          setError(null);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message);
        }
      } finally {
        if (!cancelled) {
          timer = setTimeout(loadGames, 15_000);
        }
      }
    }

    if (teamIds.length > 0) {
      loadGames();
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [teamIds]);

  if (teamIds.length === 0) {
    return (
      <div className="choose-team-card">
        <div className="no-team-gradient" />

        <span>Choose the teams you want to follow.</span>

        <div className="choose-button-container">
          <button
            className="choose-button button light"
            onClick={() => navigate("/favorite-team")}
          >
            Choose Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <GameCarousel favGames={games} />
    </>
  );
};

export default FavoriteGames;