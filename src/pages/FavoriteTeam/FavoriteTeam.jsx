import FavoriteTeamList from "./components/FavoriteTeamList";
import "./FavoriteTeam.css"
import { motion } from "framer-motion";
import { saveFavoriteTeams } from "../../profiles";
import { useState } from "react";

const FavoriteTeam = () => {
  const [favTeams, setFavTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // Toggle a team in the selection.
  const handleSelect = (team) => {
    if (loading) return;

    // Store strings to match favoriteTeams: a.string().array().
    const teamId = String(team.id);

    setFavTeams((previous) =>
      previous.includes(teamId)
        ? previous.filter((id) => id !== teamId)
        : [...previous, teamId]
    );

    setError("");
    setSaved(false);
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    setError("");
    setSaved(false);

    try {
      await saveFavoriteTeams(favTeams);
      setSaved(true);

      // Navigate to your next page here if needed.
    } catch (err) {
      setError(
        err.message || "Your favorite teams could not be saved."
      );
    } finally {
      setLoading(false);
    }
  };



  return(
    <div className="fav-team-container">

      <img src="/Logo/Logo.png" alt="Logo" className="secondary-logo"/>

      <div className="fav-team-content">
        <span className="fav-title">Favorite Team(s)</span>

        {/* <div className="fav-list-shell"> */}
          <FavoriteTeamList onSelect={handleSelect} favTeams={favTeams}/>
        {/* </div> */}
      </div>

      <div className="footer-button-container">
        <motion.button 
          className="footer-button button light"
          onClick={handleSave}
          whileTap={{scale: 0.9}}
        >
          {loading ? (
            <>
              <span className="button-spinner" aria-hidden="true"/>
            </>
          ) : (
            "Select"
          )}
        </motion.button>
      </div>
    </div>
  )
}

export default FavoriteTeam;