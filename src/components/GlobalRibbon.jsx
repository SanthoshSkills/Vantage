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
            className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800 px-2 py-1 rounded transition-colors"
            onClick={() => onSelect({
              title: `${index.name} Index Status: ${index.marketState}`,
              score: index.trend === 'up' ? 50 : -50,
              velocity: Math.abs(parseFloat(index.delta) || 0) * 10,
              url: `https://finance.yahoo.com/quote/${index.name}`,
              type: 'market',
              delta: index.delta
            })}
          >
            <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{index.name}</span>
            <span className="text-xs font-mono font-medium text-slate-200">{index.value}</span>
            <span className={`text-[10px] flex items-center ${index.trend === 'up' ? 'text-emeraldBright' : 'text-roseBright'}`}>
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
