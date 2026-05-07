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
    <div className="h-11 border-b border-white/[0.04] flex items-center px-6 overflow-hidden bg-[#010101]">
      <div className="flex items-center space-x-3 shrink-0 mr-8">
        <Activity size={12} className="text-emeraldGlow animate-pulse" />
        <span className="text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">Signal</span>
        <div className="w-px h-4 bg-white/10" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center space-x-4"
        >
          <span className={`text-sm font-medium tracking-wide ${current.class}`}>
            {current.title}
          </span>
          <span className="text-[9px] font-mono text-white/15 bg-white/[0.03] px-2 py-0.5 border border-white/[0.06]">
            V:{current.velocity}
          </span>
          <span className="text-[9px] font-mono text-white/10">
            {index + 1}/{news.length}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VelocityTicker;
