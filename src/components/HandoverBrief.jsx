import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, AlertCircle, Radio } from 'lucide-react';

const HandoverBrief = ({ show, city, topTrend, onDismiss }) => {
  if (!show) return null;

  const marketMove = (Math.random() * 2 - 1).toFixed(2);
  const isPositive = parseFloat(marketMove) > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-lg w-full bg-obsidianLight border border-slate-800 p-10 relative shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emeraldBright/40 via-emeraldBright/10 to-transparent" />
          
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-emeraldBright animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">Handover Protocol Initiated</span>
          </div>

          <h2 className="text-2xl font-medium mb-2 leading-tight text-slate-200">
            Review the Handover.
          </h2>
          <p className="text-slate-400 text-sm mb-10">
            Intelligence accumulated since your last session in <span className="text-emeraldBright">{city}</span>.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start space-x-4 p-4 bg-obsidian border border-slate-800 rounded-md">
              <TrendingUp size={16} className={isPositive ? 'text-emeraldBright mt-0.5' : 'text-roseBright mt-0.5'} />
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Market Delta</p>
                <p className="text-slate-300 text-sm">Nifty 50 shifted <span className={isPositive ? 'text-emeraldBright' : 'text-roseBright'}>{marketMove}%</span>. {isPositive ? 'Upside momentum detected.' : 'Downside pressure. Monitor closely.'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-obsidian border border-slate-800 rounded-md">
              <Radio size={16} className="text-emeraldBright mt-0.5" />
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Top Velocity Signal</p>
                <p className="text-slate-300 text-sm">"{topTrend?.title}" is now the #1 trend. Velocity peaking.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-full bg-slate-200 text-obsidian py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-emeraldBright transition-colors"
          >
            Acknowledge — Access Terminal
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HandoverBrief;
