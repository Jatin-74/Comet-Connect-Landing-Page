"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import GlitchText from "./GlitchText"; // <--- 1. IMPORT THIS

export default function Newsletter() {
  return (
    <section className="relative py-24 px-6 md:px-20 z-10 flex justify-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel w-full max-w-3xl p-12 rounded-2xl flex flex-col items-center justify-center gap-8 relative overflow-hidden mx-auto"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-tech font-bold text-green-500 tracking-tight">
            {/* 2. GLITCH ADDED HERE */}
            <GlitchText text="REQUEST_EARLY_ACCESS" />
          </h2>
          <p className="text-neutral-400 font-body text-sm">
            Join the closed beta channel. Secure your infrastructure before public release.
          </p>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <form className="flex flex-col gap-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 group-focus-within:text-green-500 transition-colors" />
              <input 
                type="email" 
                placeholder="ENTER_EMAIL_ID" 
                className="w-full bg-black/30 backdrop-blur-md border border-white/10 text-white pl-10 pr-4 py-4 rounded-lg focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-mono text-sm placeholder:text-neutral-600 text-center"
              />
            </div>
            
            <button className="w-full bg-green-500 hover:bg-green-400 text-black py-4 rounded-lg font-bold font-tech text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              JOIN_WAITLIST <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-4 text-center text-[10px] text-green-500/60 font-mono tracking-wider uppercase">
            // Status: 4 Spots Remaining
          </div>
        </div>
      </motion.div>
    </section>
  );
}