import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, TrendingUp, AlertCircle } from 'lucide-react';

const HandoverBrief = ({ show, city, topTrend, onDismiss }) => {
  if (!show) return null;

  // Simulated delta
  const marketMove = (Math.random() * 2 - 1).toFixed(2);
  const isPositive = parseFloat(marketMove) > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="max-w-lg w-full glass p-12 border border-white/10 relative"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Clock size={16} className="text-emeraldGlow" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase">Executive Handover</span>
          </div>

          <h2 className="text-3xl font-light mb-8 leading-tight">
            Syncing Status... <br />
            <span className="text-white/60">Since you were last in {city}</span>
          </h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white/5 rounded">
                <TrendingUp size={16} className={isPositive ? 'text-emerald-500' : 'text-rose-500'} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Market Shift</p>
                <p className="text-white/80">Major indices moved {marketMove}% globally.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white/5 rounded">
                <AlertCircle size={16} className="text-emeraldGlow" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Top Velocity</p>
                <p className="text-white/80">"{topTrend?.title}" is now the #1 trend.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-full bg-white text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-emeraldGlow transition-colors"
          >
            Acknowledge & Access Terminal
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HandoverBrief;
