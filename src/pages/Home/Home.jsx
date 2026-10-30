import { useEffect, useState } from "react";
import { getTodaysGames } from "../testGames";
import ScoresPage from "./components/ScoresPage";
import "./Home.css"

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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