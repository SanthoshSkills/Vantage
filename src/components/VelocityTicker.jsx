import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

const VelocityTicker = ({ news }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % news.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [news]);

  if (news.length === 0) return null;

  const current = news[index];

  return (
    <div className="h-12 border-b border-white/5 flex items-center px-6 overflow-hidden bg-obsidian">
      <div className="flex items-center space-x-4 shrink-0 mr-8">
        <Activity size={14} className="text-emeraldGlow animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Live Velocity Feed</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="flex items-center space-x-6"
        >
          <span className={`text-sm font-medium tracking-wide ${current.class}`}>
            {current.title}
          </span>
          <span className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded">
            V: {current.velocity}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VelocityTicker;
