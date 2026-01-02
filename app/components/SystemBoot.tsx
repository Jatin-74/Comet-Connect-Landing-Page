"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SystemBootProps {
  onComplete: () => void;
}

export default function SystemBoot({ onComplete }: SystemBootProps) {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootText = [
    "INITIALIZING_KERNEL...",
    "LOADING_NEURAL_NET...",
    "BYPASSING_FIREWALLS...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "ACCESS_GRANTED.", 
    "WELCOME_USER."
  ];

  useEffect(() => {
    let delay = 0;
    let totalTime = 0;

    bootText.forEach((text, index) => {
      const stepDelay = Math.random() * 300 + 400; 
      delay += stepDelay;
      totalTime = delay;

      setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      onComplete();
    }, totalTime + 1500); // Increased slightly for better readability

  }, [onComplete]);

  return (
    // 👇 CHANGED: items-center justify-center centers the content perfectly
    <div className="fixed inset-0 bg-black z-[99999] flex items-center justify-center font-mono text-green-500 text-sm md:text-base cursor-none pointer-events-none">
      <div className="text-center"> {/* 👈 Added text-center for the line alignment */}
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }} // Changed x: -10 to y: 10 for a smoother upward fade
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <span className="opacity-50 mr-2">{`>`}</span>
            {line}
          </motion.div>
        ))}
        {/* Cursor follows the last line in the center */}
        <motion.span 
          layout
          className="inline-block w-2 h-4 bg-green-500 animate-pulse mt-2" 
        />
      </div>
    </div>
  );
}