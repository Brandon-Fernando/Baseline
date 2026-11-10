import { useState, useEffect } from "react";
import CalendarWeek from "./CalendarWeek";
import FavoriteGames from "./FavoriteGames";
import GameCard from "./GameCard";
import { getGamesByDate } from "../../testGames";
import { getGameByDate } from "../../testGames";

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
        const data = await getGameByDate(chosenDate);

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
          timeoutId = setTimeout(refreshGames, 15_000);
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
    2: 0, // Live first
    1: 1, // Upcoming next
    3: 2, // Final last
  };

  const sortedGames = [...games].sort((a, b) => {
    return (
      (statusOrder[a.gameStatus] ?? 3) -
      (statusOrder[b.gameStatus] ?? 3)
    );
  });

  console.log(games)

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
              key={game.gameId}
              game={game}
              home={game.homeTeam}
              away={game.awayTeam}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ScoresPage;