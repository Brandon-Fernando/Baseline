import { useEffect, useState } from "react";
// import { getTodaysGames } from "../testGames";
import ScoresPage from "./components/ScoresPage";
import "./Home.css"
import FavoriteTeam from "../FavoriteTeam/FavoriteTeam";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "favoriteTeams";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [checkingFavorites, setCheckingFavorites] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let hasFavorites = false;

    try{
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

      hasFavorites = 
        Array.isArray(saved) &&
        saved.length > 0 && 
        saved.every((id) => typeof id === "string");

        
    } catch (error) {
      console.error(error)
    }

    const skipped = 
      localStorage.getItem("favoriteTeamSkipped") === "true"

    if (!hasFavorites && !skipped) {
      navigate("/favorite-team", { replace: true });
      return;
    }

    setCheckingFavorites(false);
  })
  
  return (
    <ScoresPage />
  );
};

export default Home;