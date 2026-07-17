import React from "react";
import { motion } from "framer-motion";
function InviteBackground() {
  const modules = import.meta.glob("../assets/floating-icons/*.svg", {
    eager: true,
    import: "default",
  });
  const icons = Object.values(modules);

  const floatingIcons = Array.from({ length: 60 }, (_, index) => ({
    id: index,
    icon: icons[Math.floor(Math.random() * icons.length)],
    left: Math.random() * 100,
    size: 25 + Math.random() * 45,
    duration: 12 + Math.random() * 15,
    delay: Math.random() * 8,
    rotate: Math.random() * 360,
    opacity: 0.08 + Math.random() * 0.15,
  }));
  return (
  <div className="absolute inset-0 bg-white">

        <img
            src={icons[0]}
            alt=""
            style={{
                width: "120px",
                position: "absolute",
                top: "100px",
                left: "100px",
                background: "red",
            }}
        />

    </div>
  );
}

export default InviteBackground;
