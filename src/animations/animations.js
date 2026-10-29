import { easeIn } from "framer-motion";


export const staggerContainer = {
  hidden: {
    opacity: 0
  }, 

  visible: {
    opacity: 1, 
    transition: {
      delayChildren: 0.07, 
      staggerChildren: 0.2
    }
  }, 
  exit: {
    opacity: 0, 
    y: -20, 
    transition: {
      duration: 0.5, 
      ease: "easeInOut"
    }
  }
}

export const staggerChildren = {
  hidden: { 
    opacity: 0, 
    y: 10, 
    scale: 0.97
  }, 

  visible: {
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: {
      duration: 0.4, 
      ease: "easeInOut"
    }
  }
}

// FAVORITE TEAM 
// export const teamSelect = {
//   inactive: {
//     background: "#393939",
//   },

//   active: {
//     background: `linear-gradient(
//       90deg,
//       color-mix(in srgb, var(--team-color) 56%, transparent),
//       color-mix(in srgb, var(--team-color) 15%, transparent)
//     )`,
//     transition: {
//       duration: 0.5, 
//       ease: "easeInOut"
//     }
//   },
// };
export const teamSelect = {
  inactive: { opacity: 0 },
  active: { opacity: 1 },
};

export const springScale = {
  hidden: {
    scale: 0, 
    opacity: 0
  }, 
  visible: {
    scale: 1, 
    opacity: 1, 
    transition: {
      duration: 0.4
    }
  }, 
  exit: {
    scale: 0, 
    opacity: 0, 
    transition: {
      duration: 0.4
    }
  }
}