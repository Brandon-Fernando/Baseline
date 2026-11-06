import { formatDate, getFavoriteGame } from "../../testGames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameCarousel from "../../../components/GameCarousel/GameCarousel";

const FavoriteGames = () => {
  const [favGames, setFavGames] = useState([]);
  const favoriteTeams = JSON.parse(
    localStorage.getItem("favoriteTeams") || "[]"
  );
  
  const navigate = useNavigate();

  // FETCH FAVORITE TEAM GAMES (CURRENT OR FUTURE)
  useEffect(() => {
    let ignore = false;
    let timeoutId;

    const teams = JSON.parse(
      localStorage.getItem("favoriteTeams") || "[]"
    );

    if (teams.length === 0) return;

    async function refreshFavoriteGames() {
      try {
        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 4);

        const data = await getFavoriteGame(
          teams,
          today,
          endDate
        );

        if (!ignore) {
          setFavGames(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to refresh favorite games:", err);
        }
      } finally {
        if (!ignore) {
          timeoutId = setTimeout(refreshFavoriteGames, 50_000);
        }
      }
    }

    refreshFavoriteGames();

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, []);

  // IF NO FAVORITE TEAM ASK USER TO CHOOSE ONE
  if(favoriteTeams.length === 0){
    return(
      <div className="choose-team-card">
        <div 
          className="no-team-gradient"
        />

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
    )
  }

  // HAS FAVORITE TEAM
  return(
    <GameCarousel 
      favGames={favGames}
    />
  )
}

export default FavoriteGames;