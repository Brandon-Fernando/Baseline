import { motion } from "framer-motion";
import { calendarButtons } from "../../../animations/animations";

const ToggleBar = ({option, setOption, options}) => {
  const optionWidth = 100 / options.length;
  const activeIndex = options.indexOf(option);

  return(
    <div className="toggle-bar-container">
      <motion.div
        className="option-slider"
        animate={{ left: `${activeIndex * optionWidth}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        style={{ width: `${optionWidth}%` }}
      />

      {options.map((opt, index) => (
        <div 
          className="option-btn"
          key={opt}
          onClick={() => setOption(opt)}
        >
          <span>{opt}</span>
        </div>
      ))}
    </div>
  )
  // return(
  //   <div className="toggle-bar-container">
  //     {options.map((opt) => (
  //       <motion.div 
  //         className="option-btn"
  //         variants={calendarButtons}
  //         initial={"inactive"}
  //         animate={opt === option ? "active" : "inactive"}
  //         onClick={() => setOption(opt)}
  //         whileTap={{scale: 0.9}}
  //       >
  //         <span>{opt}</span>
  //       </motion.div>
  //     ))}
  //   </div>
  // )
}

export default ToggleBar;