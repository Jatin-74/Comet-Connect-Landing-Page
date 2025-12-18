"use client";

import { Terminal } from "lucide-react";
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-between px-6 md:px-12 pointer-events-none">
      
      {/* LEFT ISLAND: The Brand */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-auto bg-black/80 backdrop-blur-md border border-green-500/20 px-6 py-3 rounded-md flex items-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
      >
        <Terminal className="w-5 h-5 text-green-500" />
        <span className="font-tech font-bold text-white tracking-widest text-lg">
          <GlitchText text="SURONEX" />
        </span>
      </motion.div>

      {/* RIGHT ISLAND: The Action Buttons */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/10 px-2 py-2 rounded-md flex items-center gap-1 shadow-lg"
      >
        <button className="px-5 py-2 text-sm text-neutral-400 hover:text-white font-tech font-medium transition-colors">
          // SIGN_IN
        </button>
        <button className="bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-sm text-sm font-bold font-tech transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
          GET_ACCESS
        </button>
      </motion.div>
    </div>
  );
}