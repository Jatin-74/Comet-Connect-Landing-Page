"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setLinkHovered(
        !!target.closest("a") || 
        !!target.closest("button") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  // UPDATED: Changed z-50 to z-[2147483647] (Max Safe Integer)
  // This ensures the cursor is ALWAYS on top of any modal, overlay, or error message.
  const cursorClasses = `fixed top-0 left-0 pointer-events-none z-[2147483647] mix-blend-difference`;

  return (
    <>
      <motion.div
        className={`${cursorClasses} w-8 h-8 rounded-full border border-white`}
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
          backgroundColor: linkHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
      <motion.div
        className={`${cursorClasses} w-2 h-2 bg-green-500 rounded-full`}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250, 
          damping: 20,
          mass: 0.1
        }}
      />
    </>
  );
}