"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemBoot() {
  const [loading, setLoading] = useState(true);
  const [lines, setLines] = useState<string[]>([]);

  const bootText = [
    "INITIALIZING CORE KERNEL...",
    "LOADING NEURAL NETWORKS...",
    "CONNECTING TO SECURE NODES...",
    "ENCRYPTING TRAFFIC...",
    "SYSTEM OPTIMAL.",
    "WELCOME USER."
  ];

  useEffect(() => {
    let delay = 0;
    

    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 200; 
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, delay);
    });

    
    setTimeout(() => {
      setLoading(false);
    }, delay + 800);

  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black flex items-center justify-center font-mono text-green-500 text-xs md:text-sm"
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
          transition={{ duration: 0.8 }}
        >
          <div className="w-80">
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                <span className="opacity-50 mr-2">{`>`}</span>
                {line}
              </div>
            ))}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}