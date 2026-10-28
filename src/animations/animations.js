

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