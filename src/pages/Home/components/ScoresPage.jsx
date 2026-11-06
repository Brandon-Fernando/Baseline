import { useState, useEffect } from "react";
import CalendarWeek from "./CalendarWeek";
import FavoriteGames from "./FavoriteGames";
import GameCard from "./GameCard";
import { getGamesByDate } from "../../testGames";

const ScoresPage = () => {
  const [chosenDate, setChosenDate] = useState(() =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
    }).format(new Date())
  );

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    let timeoutId;

    setLoading(true);
    setError(null);

    async function refreshGames() {
      try {
        const data = await getGamesByDate(chosenDate);

        if (!ignore) {
          setGames(data);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) {
          setLoading(false);

          // Fetch again 30 seconds after this request finishes.
          timeoutId = setTimeout(refreshGames, 50_000);
        }
      }
    }

    refreshGames();

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [chosenDate]);

  const statusOrder = {
    in_progress: 0,
    scheduled: 1,
    delayed: 2,
    suspended: 3,
    postponed: 4,
    canceled: 5,
    abandoned: 6,
    unknown: 7,
    final: 8,
  };

  const sortedGames = [...games].sort((a, b) => {
    return (
      (statusOrder[a.status_state] ?? 7) -
      (statusOrder[b.status_state] ?? 7)
    );
  });

  return(
    <div className="scores-page-container">
      <FavoriteGames />

      {/* WEEK  */}
      <CalendarWeek 
        chosenDate={chosenDate}
        onDateChange={setChosenDate}
      />

      {/* ALL SCORES  */}
      {games.length > 0 && (
        <div className="games-card-container">
          {sortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              home={game.home_team}
              away={game.visitor_team}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScoresPage;