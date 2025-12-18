"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // 1. Track Mouse Movement
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 2. Track Hover State (to make cursor bigger on buttons)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.tagName === "INPUT") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. Main Dot (The precise pointer) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-green-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6, // Center the dot
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1, // Hide dot when hovering (ring takes over)
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* 2. Glowing Ring (The smooth follower) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-green-500 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16, // Center the ring (32px / 2 = 16)
          y: mousePosition.y - 16,
          scale: isHovering ? 2 : 1, // Expand when hovering buttons
          opacity: isHovering ? 1 : 0.5,
          borderColor: isHovering ? "rgba(34, 197, 94, 0.8)" : "rgba(34, 197, 94, 0.3)"
        }}
        transition={{
          type: "spring",
          stiffness: 150, // Controls how "snappy" the movement is
          damping: 15,    // Controls how much it "wobbles"
          mass: 0.1
        }}
      />
    </>
  );
}