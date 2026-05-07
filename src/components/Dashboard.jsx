import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight } from 'lucide-react';

const Dashboard = ({ news, onSelect }) => {
  const topFive = news.slice(0, 5);

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">Executive Overview</h1>
          <p className="text-white/40 text-sm tracking-wide uppercase font-bold">Trending Velocity Topics</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-emeraldGlow bg-emeraldGlow/10 px-3 py-1 rounded-full border border-emeraldGlow/20">
            SYSTEM STATUS: PEAK PERFORMANCE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {topFive.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(item)}
            className="group relative glass p-6 rounded-none border-l-2 border-l-white/10 hover:border-l-emeraldGlow transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-[40px] font-light text-white/5 group-hover:text-white/10 transition-colors">
                0{i + 1}
              </span>
              <Zap size={16} className="text-white/20 group-hover:text-emeraldGlow transition-colors" />
            </div>
            
            <h3 className="text-lg font-medium leading-tight mb-4 group-hover:text-emeraldGlow transition-colors line-clamp-3">
              {item.title}
            </h3>

            <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Velocity</span>
                <span className="text-sm font-mono">{item.velocity}</span>
              </div>
              <ArrowUpRight size={14} className="text-white/20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
