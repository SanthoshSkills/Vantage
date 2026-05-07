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
          className="max-w-lg w-full bg-[#030303] border border-white/[0.08] p-10 relative"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-emeraldGlow/40 via-emeraldGlow/10 to-transparent" />
          
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-2 h-2 rounded-full bg-emeraldGlow animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Handover Protocol Initiated</span>
          </div>

          <h2 className="text-2xl font-light mb-2 leading-tight">
            Review the Handover.
          </h2>
          <p className="text-white/40 text-sm mb-10">
            Intelligence accumulated since your last session in <span className="text-emeraldGlow">{city}</span>.
          </p>

          <div className="space-y-6 mb-10">
            <div className="flex items-start space-x-4 p-4 bg-white/[0.02] border border-white/[0.05]">
              <TrendingUp size={16} className={isPositive ? 'text-emeraldGlow mt-0.5' : 'text-roseGlow mt-0.5'} />
              <div>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Market Delta</p>
                <p className="text-white/80 text-sm">Nifty 50 shifted <span className={isPositive ? 'text-emeraldGlow' : 'text-roseGlow'}>{marketMove}%</span>. {isPositive ? 'Upside momentum detected.' : 'Downside pressure. Monitor closely.'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-white/[0.02] border border-white/[0.05]">
              <Radio size={16} className="text-emeraldGlow mt-0.5" />
              <div>
                <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Top Velocity Signal</p>
                <p className="text-white/80 text-sm">"{topTrend?.title}" is now the #1 trend. Velocity peaking.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-full bg-white text-[#010101] py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-emeraldGlow transition-colors"
          >
            Acknowledge — Access Terminal
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HandoverBrief;
