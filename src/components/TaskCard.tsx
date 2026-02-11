'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Trash2, Clock } from 'lucide-react';
import { Task, Quadrant } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onComplete, onDelete }: TaskCardProps) {
  const [ageState, setAgeState] = useState<'fresh' | 'warm' | 'hot' | 'rot'>('fresh');

  useEffect(() => {
    if (task.completed) {
      setAgeState('fresh');
      return;
    }

    const updateAge = () => {
      const minutes = (Date.now() - task.createdAt) / (1000 * 60);
      if (minutes > 3) setAgeState('rot');
      else if (minutes > 2) setAgeState('hot');
      else if (minutes > 1) setAgeState('warm');
      else setAgeState('fresh');
    };

    updateAge();
    const interval = setInterval(updateAge, 5000);
    return () => clearInterval(interval);
  }, [task.createdAt, task.completed]);

  const quadrantColors: Record<Quadrant, string> = {
    Q1: 'text-blue-900 border-blue-200 bg-blue-500/10',
    Q2: 'text-purple-900 border-purple-200 bg-purple-500/10',
    Q3: 'text-slate-900 border-slate-200 bg-slate-500/10',
    Q4: 'text-slate-700 border-slate-100 bg-slate-400/5',
  };

  const agingClasses = {
    fresh: '',
    warm: 'shadow-[0_0_2px_rgba(0,0,0,0.05)]',
    hot: 'heat-urgent shadow-[0_0_8px_rgba(239,68,68,0.3)] border-red-500/50',
    rot: 'rot-glitch border-slate-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "group flex items-center justify-between p-2 mb-2 border glass rounded-xl transition-all duration-300",
        quadrantColors[task.quadrant],
        !task.completed && agingClasses[ageState],
        task.completed && "opacity-40 grayscale blur-[0.5px] pointer-events-none"
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className={cn(
          "font-semibold tracking-tight break-all text-[11px] leading-tight",
          task.completed && "line-through opacity-50"
        )}>
          {task.text}
        </span>
        <div className="flex items-center gap-1 text-[8px] opacity-40 font-mono">
          <Clock size={8} />
          <span>
            {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {(ageState === 'hot' || ageState === 'rot') && (
            <span className="text-red-500 font-bold animate-pulse">!</span>
          )}
        </div>
      </div>

      <div className="flex gap-1 ml-2">
        {!task.completed && (
          <button
            onClick={() => onComplete(task.id)}
            className="p-1 hover:bg-white/10 rounded-md transition-colors"
            aria-label="Complete"
          >
            <CheckCircle size={14} className="hover:text-green-400" />
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 hover:bg-white/10 rounded-md transition-colors"
          aria-label="Delete"
        >
          <Trash2 size={14} className="opacity-50 group-hover:opacity-100 group-hover:text-red-400" />
        </button>
      </div>
    </motion.div>
  );
}
