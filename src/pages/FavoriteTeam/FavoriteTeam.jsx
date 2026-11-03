import FavoriteTeamList from "./components/FavoriteTeamList";
import "./FavoriteTeam.css"
import { motion } from "framer-motion";
import { saveFavoriteTeams } from "../../profiles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "favoriteTeams";

const FavoriteTeam = () => {
  const [favTeams, setFavTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

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

  const handleSave = () => {
    if (loading) return;

    if (favTeams.length === 0) {
      return;
    }

    setLoading(true);

    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favTeams));
      localStorage.removeItem("favoriteTeamSkipped")
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSkip = () => {
    localStorage.setItem("favoriteTeamSkipped", "true");
    navigate("/", { replace: true })
  }


  return(
    <div className="fav-team-container">
      <span onClick={handleSkip} className="skip">Skip</span>

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