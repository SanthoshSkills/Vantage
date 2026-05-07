import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight, Shield } from 'lucide-react';

const Dashboard = ({ news, onSelect, city }) => {
  const topFive = news.slice(0, 5);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-end justify-between mb-12">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <Shield size={14} className="text-emeraldGlow" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
              {city} Command // {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-1">Velocity Override</h1>
          <p className="text-white/30 text-xs tracking-widest uppercase font-bold">Top 5 Heat-Ranked Directives — Review Required</p>
        </div>
        <div className="text-right flex flex-col items-end space-y-2">
          <span className="text-[10px] font-mono text-emeraldGlow bg-emeraldGlow/10 px-3 py-1 rounded-full border border-emeraldGlow/20 inline-flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emeraldGlow animate-pulse" />
            <span>SYSTEMS NOMINAL</span>
          </span>
          <span className="text-[9px] font-mono text-white/20">{news.length} SIGNALS TRACKED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {topFive.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={() => onSelect(item)}
            className="group relative bg-obsidianLight border border-slate-800 p-5 rounded-md shadow-lg cursor-pointer hover:border-emeraldBright transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emeraldBright/0 via-emeraldBright/20 to-emeraldBright/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-5">
              <span className="text-[36px] font-extralight text-slate-700 group-hover:text-slate-500 transition-colors leading-none">
                0{i + 1}
              </span>
              <Zap size={14} className="text-slate-600 group-hover:text-emeraldBright transition-colors" />
            </div>
            
            <h3 className={`text-[15px] font-medium leading-snug mb-4 transition-colors line-clamp-3 ${item.class || 'text-slate-200'} group-hover:brightness-125`}>
              {item.title}
            </h3>

            <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] text-slate-400 uppercase font-bold tracking-[0.2em]">Velocity</span>
                <span className="text-sm font-mono text-slate-300">{item.velocity}</span>
              </div>
              <ArrowUpRight size={12} className="text-slate-600 group-hover:text-emeraldBright group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex items-center space-x-4">
        <div className="h-px flex-grow bg-gradient-to-r from-white/5 to-transparent" />
        <span className="text-[9px] font-bold tracking-[0.3em] text-white/15 uppercase">End of Priority Feed</span>
        <div className="h-px flex-grow bg-gradient-to-l from-white/5 to-transparent" />
      </div>
    </div>
  );
};

export default Dashboard;
