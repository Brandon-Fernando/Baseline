import GameCard from "../FavoriteGame/GameCard";
import "./GameCarousel.css"
import { useState, useRef } from "react";

const GameCarousel = () => {
  const temp = [1, 2, 3]
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  return(
    <div className="game-carousel-container">
      <div 
        className="game-slider"
        onScroll={(event) => {
          const slider = event.currentTarget;
          setActive(Math.round(slider.scrollLeft / slider.clientWidth));
        }}
      >
        {temp.map((game) => (
          // <div className="temp-game" key={game}>
          //   <span>adf</span>
          //   <span>asdf</span>
          // </div>
          <GameCard 
            key={game}
          />
        ))}
      </div>
    </div>
  )
}

export default GameCarousel;