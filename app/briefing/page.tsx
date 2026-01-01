"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Terminal } from "lucide-react";

export default function BriefingPage() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full bg-neutral-900/50 border border-green-500/30 p-12 rounded-lg backdrop-blur-md relative z-10 text-center"
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

        <div className="bg-black/40 p-6 rounded border border-white/10 text-left mb-8">
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