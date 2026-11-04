import FavoriteGameCard from "../../pages/Home/components/FavoriteGameCard";
import "./Carousel.css"
import { useRef, useState } from "react";

const Carousel = () => {
  const cards = ["asdf", ""]

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
        {cards.map((card) => (
          <div className="carousel-slide" key={card}>
            {/* <FavoriteGameCard /> */}
            {/* <div className="card" key={card}> */}
              <FavoriteGameCard />
            {/* </div> */}
          </div>
        ))}
      </div>
      
    {cards.length > 1 && (
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