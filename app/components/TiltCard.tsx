"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  // We only track ONE axis now (X - Left/Right)
  const yRotation = useMotionValue(0);

  // Stiffer physics for a "Formal/Heavy" feel
  // Stiffness 400 (was 300) = Snappier return
  // Damping 40 (was 30) = Less wobble
  const ySpring = useSpring(yRotation, { stiffness: 400, damping: 40 });

  // ONLY rotate on the Y-axis (which looks like the card turning left/right)
  const transform = useMotionTemplate`rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;

    // Calculate mouse position relative to center
    const mouseX = (e.clientX - rect.left) * 32.5;

    // Constrained Rotation:
    // Dividing by a larger number (width / 2.5) makes the tilt subtler
    // Range is roughly -8deg to +8deg
    const rY = mouseX / width / 2.5;

    yRotation.set(rY);
  };

  const handleMouseLeave = () => {
    // Snap back to flat instantly
    yRotation.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={`relative h-full w-full ${className}`}
    >
      {/* Removed "translateZ" from the inner div.
         Keeping the content flat against the card prevents 
         the text from looking distorted or "messy" during the tilt.
      */}
      <div className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;