"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Terminal } from "lucide-react";
import MatrixRain from "@/app/components/MatrixRain";

export default function BriefingPage() {
  return (
    // 👇 FIXED: Removed 'bg-black' (it is already black from layout.tsx). Added 'relative'.
    <div className="w-full h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* The Rain (z-index 1) */}
      <MatrixRain />

      {/* Content Card (z-index 10 - Sits ON TOP of rain) */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-[10] max-w-2xl w-full bg-neutral-900/80 border border-green-500/30 p-12 rounded-lg backdrop-blur-md text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" />
        </div>

        <h1 className="font-tech text-4xl md:text-5xl text-white mb-4">
          PROTOCOL INITIATED
        </h1>
        
        <div className="w-full h-px bg-green-500/30 my-6" />

        <p className="font-mono text-lg text-green-400 mb-8">
          The asset has been deployed to your Downloads folder.
        </p>

        <div className="bg-black/80 p-6 rounded border border-white/10 text-left mb-8">
          <p className="font-bold text-white mb-2 font-mono">⚠️ MISSION CRITICAL:</p>
          <ul className="text-neutral-400 font-mono text-sm space-y-2 list-disc pl-5">
            <li>Locate <strong>Comet-Connect.zip</strong></li>
            <li>Right-click and select <strong>"Extract All"</strong></li>
            <li>Load the extracted folder in Developer Mode</li>
          </ul>
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors font-mono text-sm">
          <Terminal size={14} />
          RETURN_TO_BASE
        </Link>

      </motion.div>
    </div>
  );
}