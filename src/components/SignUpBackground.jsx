import React,{useMemo} from 'react'
import { motion } from "framer-motion";
import icons from "../assets/floating-icons/Signup_Icons/export.js";
import "../SignUpBackground.css"

const ICON_COUNT = 48;
const SPACING = 180;

function SignUpBackground() {

  const floatingIcons = useMemo(() => {
    return Array.from({ length: ICON_COUNT }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: 5 + Math.random() * 90,
      top: i * SPACING,
      size: 28 + Math.random() * 35,
      
      opacity: 0.45 + Math.random() * 0.25,
    }));
  }, []);

  return (
<div className="signup-background">
      <motion.div
        className="scroll-column"
        animate={{
          y: [0, -(ICON_COUNT * SPACING)],
        }}
        transition={{
          duration: 65,
          ease: "linear",
          repeat: Infinity,
        }}
      >
      
        {floatingIcons.map((item) => (
          <img
            key={`first-${item.id}`}
            src={item.icon}
            alt=""
            className="floating-icon"
            style={{
              left: `${item.left}%`,
              top: `${item.top}px`,
              width: `${item.size}px`,
              opacity: item.opacity,
              transform: `rotate(${item.rotate}deg)`,
            }}
          />
        ))}

        
        {floatingIcons.map((item) => (
          <img
            key={`second-${item.id}`}
            src={item.icon}
            alt=""
            className="floating-icon"
            style={{
              left: `${item.left}%`,
              top: `${item.top + ICON_COUNT * SPACING}px`,
              width: `${item.size}px`,
              opacity: item.opacity,
              transform: `rotate(${item.rotate}deg)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default SignUpBackground
