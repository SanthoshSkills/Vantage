import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

const VelocityTicker = ({ news, onSelect }) => {
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
    <div className="h-11 border-b border-slate-800 flex items-center px-6 overflow-hidden bg-obsidianLight cursor-pointer hover:bg-slate-900 transition-colors" onClick={() => onSelect(current)}>
      <div className="flex items-center space-x-3 shrink-0 mr-8">
        <Activity size={12} className="text-emeraldBright animate-pulse" />
        <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase">Signal</span>
        <div className="w-px h-4 bg-slate-700" />
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
          <span className={`text-sm font-medium tracking-wide ${current.class ? current.class : 'text-slate-200'}`}>
            {current.title}
          </span>
          <span className="text-[9px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 border border-slate-700 rounded-sm">
            V:{current.velocity}
          </span>
          <span className="text-[9px] font-mono text-slate-500">
            {index + 1}/{news.length}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VelocityTicker;
