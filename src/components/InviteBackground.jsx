import React from 'react'
import { motion } from "framer-motion"
function InviteBackground() {

    const modules = import.meta.glob(
        "../assets/floating-icons/*.svg",
        {
            eager: true,
            import: "default"
        }
    )
    const icons = Object.values(modules)

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
 <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

            {floatingIcons.map((item) => (
                <motion.img
                    key={item.id}
                    src={item.icon}
                    alt=""
                    className="absolute"
                    style={{
                        left: `${item.left}%`,
                        width: `${item.size}px`,
                        opacity: item.opacity,
                    }}
                    initial={{
                        y: "-15vh",
                        rotate: item.rotate,
                    }}
                    animate={{
                        y: "120vh",
                        x: [0, 20, -15, 15, 0],
                        rotate: item.rotate + 360,
                    }}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: item.delay,
                    }}
                />
            ))}

        </div>
  )
}

export default InviteBackground
