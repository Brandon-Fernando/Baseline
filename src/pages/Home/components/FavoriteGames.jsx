import { formatDate, getFavoriteGame } from "../../testGames";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../../../components/Carousel/Carousel";

const FavoriteGames = () => {
  const [favGame, setFavGame] = useState([]);
  const favoriteTeams = JSON.parse(
    localStorage.getItem("favoriteTeams") || "[]"
  );
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(favoriteTeams.length === 0){
  //     return;
  //   }

  //   async function testGames() {
  //     const favoriteTeams = JSON.parse(
  //       localStorage.getItem("favoriteTeams") || "[]"
  //     );

  //     const today = new Date();
  //     const endDate = new Date(today);
  //     endDate.setDate(endDate.getDate() + 4);

  //     const data = await getFavoriteGame(
  //       favoriteTeams,
  //       today,
  //       endDate
  //     );
      
  //     setFavGame(data)
  //   }
    
  //   testGames().catch(console.error);
  // }, []);

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

  // console.log(favGame.game)


  return(
    <Carousel />
  )
}

export default FavoriteGames;