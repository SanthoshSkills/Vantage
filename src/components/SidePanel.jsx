import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Target, BarChart3, Radio, HelpCircle } from 'lucide-react';

const SidePanel = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  const points = [
    { label: 'The Fact', value: item.title, icon: Info },
    { label: 'The Impact', value: 'High likelihood of sector-wide volatility and strategic realignment.', icon: Target },
    { label: 'The Sentiment', value: item.score > 0 ? 'Bullish / Positive expansion detected.' : 'Bearish / Risk mitigation required.', icon: Radio },
    { label: 'The Velocity', value: `Currently at ${item.velocity} - Trending above 90th percentile.`, icon: BarChart3 },
    { label: 'The "So What?"', value: 'Requires immediate executive review for resource allocation and risk management.', icon: HelpCircle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-50 p-10 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Executive Briefing</span>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} className="text-white/40" />
              </button>
            </div>

            <h2 className={`text-2xl font-light mb-12 leading-tight ${item.class}`}>
              {item.title}
            </h2>

            <div className="space-y-10 overflow-y-auto custom-scrollbar pr-4">
              {points.map((point, i) => (
                <div key={i} className="group">
                  <div className="flex items-center space-x-3 mb-2 text-white/40">
                    <point.icon size={14} className="group-hover:text-emeraldGlow transition-colors" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">{point.label}</span>
                  </div>
                  <p className="text-white/80 font-light leading-relaxed">
                    {point.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5">
              <button className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-emeraldGlow transition-colors">
                Initiate Executive Action
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
