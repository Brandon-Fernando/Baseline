import CalendarWeek from "./CalendarWeek";
import FavoriteGames from "./FavoriteGames";

const ScoresPage = () => {

  return(
    <div className="scores-page-container">
      <FavoriteGames />

      {/* WEEK  */}
      <CalendarWeek />

      
    </div>
  )
}

export default ScoresPage;