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

 
  const yRotation = useMotionValue(0);
  const ySpring = useSpring(yRotation, { stiffness: 400, damping: 40 });
  const transform = useMotionTemplate`rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;

    
    const mouseX = (e.clientX - rect.left) * 32.5;

   
    const rY = mouseX / width / 2.5;

    yRotation.set(rY);
  };

  const handleMouseLeave = () => {
    
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
      
      <div className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;