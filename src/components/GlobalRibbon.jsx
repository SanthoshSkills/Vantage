import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const GlobalRibbon = ({ indices, onSelect }) => {
  return (
    <div className="w-full bg-[#050505] border-b border-white/5 py-2 overflow-hidden relative">
      <motion.div 
        className="flex space-x-12 whitespace-nowrap px-4"
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {[...indices, ...indices].map((index, i) => (
          <div 
            key={`${index.name}-${i}`} 
            className="flex items-center space-x-3 cursor-pointer hover:bg-white/5 px-2 py-1 rounded transition-colors"
            onClick={() => onSelect(index)}
          >
            <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">{index.name}</span>
            <span className="text-xs font-mono font-medium">{index.value}</span>
            <span className={`text-[10px] flex items-center ${index.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {index.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {index.delta}
            </span>
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent z-10" />
    </div>
  );
};

export default GlobalRibbon;
