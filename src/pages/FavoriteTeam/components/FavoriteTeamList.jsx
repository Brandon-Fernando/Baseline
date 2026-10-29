import { useState } from "react";
import { teams } from "../../../data/team";
import { motion, AnimatePresence } from "framer-motion";
import { springScale, teamSelect } from "../../../animations/animations";

const FavoriteTeamList = ({
  favTeams,
  onSelect,
  disabled = false,
}) => {
  // const [favTeams, setFavTeams] = useState([]);

  // const handleSelect = (team) => {
  //   setFavTeams((prev) =>
  //     prev.includes(team.id)
  //       ? prev.filter((id) => id !== team.id)
  //       : [...prev, team.id]
  //   );
  // };

  return (
    <div className="fav-list-container">
      {teams.map((team) => {
        const isSelected = favTeams.includes(team.id);

        return (
          <motion.div
            className="fav-button-wrapper"
            onClick={() => onSelect(team)}
            key={team.id}
            style={{ "--team-color": team.color }}
            initial={false}
            animate={isSelected ? "active" : "inactive"}
          >
            <motion.div
              className="fav-team-gradient"
              variants={teamSelect}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              aria-hidden="true"
            />

            <div className="fav-team-info">
              <img
                src={team.logo}
                alt={`${team.city} ${team.name} logo`}
                className="fav-logo"
              />
              <span className="fav-team-name">
                {team.city} {team.name}
              </span>
            </div>

            <div className="fav-toggle">
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    key={team.id}
                    className="fav-toggle-selected"
                    variants={springScale}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FavoriteTeamList;