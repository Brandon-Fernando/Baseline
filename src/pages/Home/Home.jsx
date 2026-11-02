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

  // function handleSaveTeams(teamIds) {
  //   if(teamIds.length === 0) return;

  //   try{
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(teamIds));
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setFavoriteTeams(teamIds);
  // }




  // useEffect(() => {
  //   let active = true;

  //   async function loadGames() {
  //     try {
  //       const data = await getTodaysGames();

  //       console.log(data);

  //       if (active) setGames(data);
  //     } catch (err) {
  //       if (active) setError(err.message);
  //     } finally {
  //       if (active) setLoading(false);
  //     }
  //   }

  //   loadGames();

  //   return () => {
  //     active = false;
  //   };
  // }, []);

  // if (loading) return <p>Loading games...</p>;
  // if (error) return <p>{error}</p>;



  return (
    // <div>
    //   {/* Temporary: inspect the data while building your page */}
    //   {/* <pre>{JSON.stringify(games, null, 2)}</pre> */}
    // </div>

    <ScoresPage />
  );
};

export default Home;