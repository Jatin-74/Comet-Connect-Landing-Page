"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./components/Hero";
import LegalFooter from "./components/LegalFooter";
// 👇 FIXED: Changed to relative path to match the others
import MatrixRain from "./components/MatrixRain"; 
import SystemBoot from "./components/SystemBoot"; 

export default function Home() {
  const [booting, setBooting] = useState(true);

  return (
    <main className="relative w-full min-h-screen bg-black flex flex-col">
      
      {/* 1. THE BOOT SEQUENCE */}
      <AnimatePresence>
        {booting && (
          <motion.div 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[99999] bg-black"
          >
            {/* Make sure "SystemBoot.tsx" exists in your components folder! */}
            <SystemBoot onComplete={() => setBooting(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE MAIN SITE */}
      {!booting && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="flex flex-col min-h-screen w-full relative"
        >
            {/* Background Layer */}
            <div className="fixed inset-0 z-0 opacity-50"> 
                <MatrixRain />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col min-h-screen w-full">
                <div className="flex-grow">
                  <Hero />
                </div>
                <LegalFooter />
            </div>
        </motion.div>
      )}
      
    </main>
  );
}