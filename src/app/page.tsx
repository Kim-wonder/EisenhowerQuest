'use client';

import { useGameState } from '@/hooks/useGameState';
import { XPBar } from '@/components/XPBar';
import { QuadrantGrid } from '@/components/QuadrantGrid';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

export default function Home() {
  const { state, isLoaded, addTask, completeTask, deleteTask } = useGameState();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Swords size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1e293b] selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-600 font-mono text-[10px] tracking-widest uppercase mb-1"
            >
              <Swords size={12} />
              <span>Project Matrix</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-black tracking-tighter"
            >
              EISENHOWER <span className="text-blue-600/20 underline decoration-blue-500/50 underline-offset-4">QUEST</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-right hidden md:block"
          >
            <p className="text-[10px] font-mono opacity-40 uppercase tracking-tighter">Current Strategy</p>
            <p className="text-sm font-bold text-blue-600">Gamified Prioritization</p>
          </motion.div>
        </header>

        <XPBar xp={state.xp} level={state.level} />

        <QuadrantGrid
          tasks={state.tasks}
          onAddTask={addTask}
          onComplete={completeTask}
          onDelete={deleteTask}
        />

        <footer className="py-12 border-t border-blue-500/10 text-center text-xs font-mono opacity-40 uppercase tracking-widest">
          No pain, No Gain • Master your time
        </footer>
      </div>
    </main>
  );
}
