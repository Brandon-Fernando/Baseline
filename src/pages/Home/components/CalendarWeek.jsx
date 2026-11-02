import { useState } from "react";
import { motion } from "framer-motion";
import { calendarButtons } from "../../../animations/animations";


const CalendarWeek = () => {
  const [weekOffset, setWeekOffset] = useState(0);
 

  const today = new Date();

  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(), 
    today.getDate() - today.getDay() + weekOffset * 7
  )

  const days = Array.from({length: 7}, (_, index) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + index);
    return date;
  })

  const [chosenDate, setChosenDate] = useState(today.toDateString())

  return(
    <div className="week-container">
      {/* BUTTON / DATE  */}
      <div className="toggle-week-wrapper">
        <motion.button 
          className="toggle-week-btn"
          whileTap={{scale: 0.5}}
          onClick={() => setWeekOffset((offset) => offset - 1)}
        >
          <i className="fa-solid fa-angle-left"/>
        </motion.button>

        <span>October 2026</span>

        <motion.button 
          className="toggle-week-btn"
          whileTap={{scale: 0.5}}
          onClick={() => setWeekOffset((offset) => offset + 1)}
        >
          <i className="fa-solid fa-angle-right"/>
        </motion.button>
      </div>

      {/* CALENDAR  */}
      <div key={weekOffset} className="calendar-week-wrapper">
        {days.map((date) => (
          <motion.div 
            className="day-button"
            key={date.toDateString()}
            variants={calendarButtons}
            onClick={() => setChosenDate(date.toDateString())}
            initial="inactive"
            animate={date.toDateString() === chosenDate ? "active" : "inactive"}
          >
            <span>
               {date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>

            <span>
              {date.getDate()}
            </span>
          </motion.div>
        ))}
      </div>
      
    </div>
  )
}

export default CalendarWeek;