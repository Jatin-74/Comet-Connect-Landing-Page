"use client";

import { useState } from "react"; 
import { ShieldCheck, Zap, Lock, Terminal } from 'lucide-react'; 
import { motion } from "framer-motion";
import GlitchText from "./GlitchText";
import TiltCard from "./TiltCard"; 


const FeatureCard = ({ title, desc, icon: Icon, index }: any) => {
  const [isHovered, setIsHovered] = useState(false); 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
      
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TiltCard className="group">
        <div className="glass-panel relative overflow-hidden rounded-xl p-8 h-full flex flex-col transition-all duration-300">
          
          
          <div className="absolute -right-10 -top-10 bg-green-500/10 w-32 h-32 blur-[40px] rounded-full group-hover:bg-green-500/20 transition-all opacity-10 group-hover:opacity-100" />
          
          <div className="relative z-10 flex-1">
            <div className="w-12 h-12 rounded-lg bg-black/50 border border-green-500/20 flex items-center justify-center mb-6 group-hover:border-green-500/50 transition-colors shadow-inner">
              <Icon className="w-5 h-5 text-green-500" />
            </div>
            
            <h3 className="text-xl font-tech font-bold text-white mb-3 tracking-wide group-hover:text-green-400 transition-colors">
              
              <GlitchText text={title} trigger={isHovered} />
            </h3>
            
            <p className="text-neutral-400 text-sm leading-relaxed font-body pl-1 border-l-2 border-transparent group-hover:border-green-500/30 transition-all">
              {desc}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default function Features() {
  const features = [
    {
      title: "PREDICTIVE_AI",
      desc: "Neural networks analyze traffic patterns in real-time to block zero-day exploits before they execute.",
      icon: ShieldCheck
    },
    {
      title: "GLOBAL_EDGE",
      desc: "Deployed across 240+ secure endpoints worldwide ensuring <10ms latency for all users.",
      icon: Terminal
    },
    {
      title: "AUTO_ENCRYPTION",
      desc: "AES-256 encryption applied by default to all data in transit and at rest.",
      icon: Lock
    },
    {
      title: "INSTANT_COMPLIANCE",
      desc: "Generate SOC2, HIPAA, and ISO 27001 audit reports in seconds, not weeks.",
      icon: Zap
    }
  ];

  return (
    <section className="bg-transparent relative py-24 px-6 md:px-20 z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 border-b border-green-500/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-tech font-bold text-white mb-2 flex gap-2">
              <GlitchText text="SYSTEM_" />
              <span className="text-green-500">
                <GlitchText text="MODULES" />
              </span>
            </h2>
            <p className="text-neutral-500 text-sm font-mono max-w-lg">
              // ARCHITECTURE_OVERVIEW
            </p>
          </div>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}