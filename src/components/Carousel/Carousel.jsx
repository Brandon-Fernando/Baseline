import FavoriteGameCard from "../../pages/Home/components/FavoriteGameCard";
import "./Carousel.css"
import { useRef, useState } from "react";

const Carousel = ({favGames}) => {
  const cards = ["asdf", ""]

  // console.log(favGames)

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
    <div className="carousel">
      <div
          ref={sliderRef}
          className="card-slider"
          onScroll={(event) => {
            const slider = event.currentTarget;
            setActive(Math.round(slider.scrollLeft / slider.clientWidth));
          }}
        >
        {favGames.map((game) => (
          <div className="carousel-slide" key={game.teamId}>
            {/* <FavoriteGameCard /> */}
            {/* <div className="card" key={card}> */}
              <FavoriteGameCard 
                game={game.game}
              />
            {/* </div> */}
          </div>
        ))}
      </div>
      
    {favGames.length > 1 && (
      <div className="slider-dots" aria-label="Choose a card">
        {cards.map((card, index) => (
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

export default Carousel;