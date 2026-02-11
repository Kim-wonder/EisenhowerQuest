'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { LEVEL_UP_THRESHOLD } from '../types';

interface XPBarProps {
  xp: number;
  level: number;
}

export function XPBar({ xp, level }: XPBarProps) {
  const progress = (xp / LEVEL_UP_THRESHOLD) * 100;

  return (
    <div className="w-full glass rounded-xl p-3 flex items-center gap-4 mb-4">
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-indigo-100">
          <span className="text-xl font-bold font-mono leading-none">L{level}</span>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute -top-1 -right-1 text-yellow-500"
        >
          <Trophy size={14} fill="currentColor" />
        </motion.div>
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono tracking-widest uppercase opacity-60 leading-none">
          <span>경험치 (XP)</span>
          <span>{xp} / {LEVEL_UP_THRESHOLD} XP</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </div>
    </div>
  );
}
