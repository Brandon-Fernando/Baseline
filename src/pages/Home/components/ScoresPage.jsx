import { useState, useEffect } from "react";
import CalendarWeek from "./CalendarWeek";
import FavoriteGames from "./FavoriteGames";
import GameCard from "./GameCard";

const ScoresPage = () => {
  const [chosenDate, setChosenDate] = useState(() =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
    }).format(new Date())
  );

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   let ignore = false;

  //   setLoading(true);
  //   setError(null);

  //   getGamesByDate(chosenDate)
  //     .then((data) => {
  //       if (!ignore) setGames(data);
  //     })
  //     .catch((err) => {
  //       if (!ignore) setError(err.message);
  //     })
  //     .finally(() => {
  //       if (!ignore) setLoading(false);
  //     });

  //   return () => {
  //     ignore = true;
  //   };
  // }, [chosenDate]);

  return(
    <div className="scores-page-container">
      <FavoriteGames />

      {/* WEEK  */}
      <CalendarWeek 
        chosenDate={chosenDate}
        onDateChange={setChosenDate}
      />

      {/* ALL SCORES  */}
      <GameCard />
    </div>
  )
}

export default ScoresPage;