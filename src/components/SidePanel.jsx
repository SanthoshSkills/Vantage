import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crosshair, Target, Radio, BarChart3, AlertTriangle } from 'lucide-react';

const SidePanel = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  const isPositive = item.score > 0;

  const points = [
    { 
      label: 'The Fact', 
      value: item.title, 
      icon: Crosshair,
      accent: 'text-white/60'
    },
    { 
      label: 'The Impact', 
      value: isPositive 
        ? 'Sector expansion signal detected. Position for upside capture.' 
        : 'Contraction risk flagged. Hedge exposure and monitor downstream effects.',
      icon: Target,
      accent: 'text-white/60'
    },
    { 
      label: 'The Sentiment', 
      value: isPositive 
        ? `Bullish. NLP Score: +${item.score}. Market confidence trending positive.` 
        : `Bearish. NLP Score: ${item.score}. Defensive posture recommended.`,
      icon: Radio,
      accent: isPositive ? 'text-emeraldGlow' : 'text-roseGlow'
    },
    { 
      label: 'The Velocity', 
      value: `V-Index: ${item.velocity} — ${parseFloat(item.velocity) > 80 ? 'Critical mass. Viral propagation imminent.' : parseFloat(item.velocity) > 50 ? 'Elevated. Monitor for acceleration.' : 'Baseline. No immediate action required.'}`,
      icon: BarChart3,
      accent: 'text-white/60'
    },
    { 
      label: 'So What?', 
      value: isPositive 
        ? 'Actionable window open. Executive decision required within 4h cycle.' 
        : 'Risk containment priority. Escalate to stakeholders. Brief at next sync.',
      icon: AlertTriangle,
      accent: 'text-amber-400'
    },
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 250 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidianLight border-l border-slate-800 z-50 flex flex-col shadow-2xl"
          >
            <div className="p-8 pb-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emeraldBright' : 'bg-roseBright'} animate-pulse`} />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Intelligence Brief</span>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded transition-colors">
                  <X size={16} className="text-slate-400" />
                </button>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-700 to-transparent mb-8" />
            </div>

            <div className="px-8 mb-6">
              <h2 className={`text-xl font-medium leading-tight ${item.class || 'text-slate-200'}`}>
                {item.title}
              </h2>
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar px-8 space-y-8">
              {points.map((point, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="group"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <point.icon size={13} className={`${point.accent} transition-colors`} />
                    <span className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase">{point.label}</span>
                  </div>
                  <p className="text-slate-300 text-sm font-normal leading-relaxed pl-[25px]">
                    {point.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="p-8 pt-6 border-t border-slate-800 space-y-3 bg-obsidian">
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full block text-center bg-slate-200 text-obsidian py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-emeraldBright transition-colors"
              >
                Access Source Intel
              </a>
              <button onClick={onClose} className="w-full bg-transparent text-slate-400 py-2 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-slate-200 transition-colors">
                Dismiss Brief
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
