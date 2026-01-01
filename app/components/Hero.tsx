"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react"; 
import GlitchText from "./GlitchText";
import dynamic from 'next/dynamic'; 


const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false, 
  loading: () => (
    
    <div className="w-full h-full flex items-center justify-center opacity-20">
       <span className="text-green-500 font-mono text-xs animate-pulse">LOADING_MODEL...</span>
    </div>
  ),
});

export default function Hero() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setTrigger(true);
      setTimeout(() => setTrigger(false), 500);
    }, 5000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section className="relative w-full h-screen bg-transparent overflow-hidden flex flex-col md:flex-row items-center">
      
      

     
      <div className="z-10 w-full md:w-1/2 px-6 md:pl-24 pt-20 flex flex-col justify-center h-full pointer-events-none">
        <div className="pointer-events-auto">
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-green-900/20 border border-green-500/30 text-green-400 text-xs font-mono mb-8"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            SYSTEM_ONLINE :: v2.4.0
          </motion.div>
          
          <h1 className="font-tech text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8 min-h-[160px]">
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, type: "tween", ease: "linear" }} 
              className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-green-500 pr-2 align-top w-fit"
              style={{ borderRightColor: "transparent" }}
            >
              COMET
            </motion.span>
            <br />
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1, type: "tween", ease: "linear" }} 
              className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-green-500 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 pr-2 pb-2"
            >
              <GlitchText text="CONNECT" trigger={trigger} />
            </motion.span>
          </h1>
          
          <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-body text-neutral-400 text-lg md:text-xl max-w-md mb-10 border-l-2 border-green-500/50 pl-6"
          >
            Connect Without Limits.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button className="relative px-8 py-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 font-tech font-bold text-lg hover:bg-green-500 hover:text-black transition-all duration-300 backdrop-blur-sm overflow-hidden group">
              <span className="relative z-10">INITIALIZE_PROTOCOL</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-green-400/20 to-transparent skew-x-12" />
            </button>
            <button className="px-8 py-4 rounded-lg border border-white/10 text-neutral-400 font-tech text-sm hover:text-white hover:border-white/30 transition-colors backdrop-blur-sm">
              VIEW_SOURCE
            </button>
          </motion.div>
        </div>
      </div>

      
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0">
        <div className="w-full h-full">
           <Spline scene="https://prod.spline.design/Gyik1BJ91KLHO5K8/scene.splinecode" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-transparent" />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}