import GameCard from "../FavoriteGame/GameCard";
import "./GameCarousel.css"
import { useState, useRef } from "react";

const GameCarousel = ({favGames}) => {
  const temp = [1, 2, 3]
  const sliderRef = useRef(null);
  const [active, setActive] = useState(0);

  function goToCard(index) {
    const slider = sliderRef.current;
    slider.scrollTo({
      left: index * slider.clientWidth,
      behavior: "smooth",
    });
  }

  return(
    <div className="game-carousel-container">
      {/* FAVORITE TEAM CARDS */}
      <div 
        ref={sliderRef}
        className="game-slider"
        onScroll={(event) => {
          const slider = event.currentTarget;
          setActive(Math.round(slider.scrollLeft / slider.clientWidth));
        }}
      >
        {favGames.map((game) => (
          <GameCard 
            key={game.id}
            game={game.game}
          />
        ))}
      </div>

      {/* TOGGLE BUTTONS */}
      {favGames.length > 1 && (
        <div className="slider-dots" aria-label="Choose a card">
          {favGames.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={`dot ${active === index ? "active" : ""}`}
              aria-label={`Go to card ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => goToCard(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GameCarousel;