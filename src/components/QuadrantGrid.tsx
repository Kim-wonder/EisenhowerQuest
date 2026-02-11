'use client';

import { useState } from 'react';
import { LucideIcon, Plus, Zap, Target, Coffee, Inbox } from 'lucide-react';
import { Task, Quadrant } from '../types';
import { TaskCard } from './TaskCard';
import { AnimatePresence } from 'framer-motion';

interface QuadrantGridProps {
  tasks: Task[];
  onAddTask: (text: string, quadrant: Quadrant) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

interface QuadrantDef {
  id: Quadrant;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
}

export function QuadrantGrid({ tasks, onAddTask, onComplete, onDelete }: QuadrantGridProps) {
  const quadrants: QuadrantDef[] = [
    { id: 'Q1', title: '긴급/중요', subtitle: '', icon: Zap, color: 'border-blue-500/30' },
    { id: 'Q2', title: '긴급하지 않음/중요', subtitle: '', icon: Target, color: 'border-purple-500/30' },
    { id: 'Q3', title: '긴급/중요하지 않음', subtitle: '', icon: Inbox, color: 'border-slate-500/30' },
    { id: 'Q4', title: '긴급하지 않음/중요하지 않음', subtitle: '', icon: Coffee, color: 'border-slate-300/30' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 h-full pb-8">
      {quadrants.map((q) => (
        <QuadrantBox
          key={q.id}
          {...q}
          tasks={tasks.filter((t) => t.quadrant === q.id)}
          onAddTask={onAddTask}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

interface QuadrantBoxProps extends QuadrantDef {
  tasks: Task[];
  onAddTask: (text: string, quadrant: Quadrant) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function QuadrantBox({ id, title, icon: Icon, color, tasks, onAddTask, onComplete, onDelete }: QuadrantBoxProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddTask(inputText, id);
    setInputText('');
  };

  return (
    <div className={`flex flex-col glass rounded-2xl p-3 border-t-2 ${color} min-h-[300px] md:min-h-[350px]`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-white/5 rounded-lg">
          <Icon size={16} className="opacity-80" />
        </div>
        <h3 className="font-bold tracking-tight text-xs md:text-sm truncate">{title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="할 일 추가..."
          className="w-full bg-white/5 border border-white/10 rounded-lg py-1.5 pl-3 pr-8 text-[11px] focus:outline-none focus:border-white/25 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 p-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
        >
          <Plus size={14} />
        </button>
      </form>

      <div className="flex-1 overflow-y-auto max-h-[180px] md:max-h-[250px] pr-1 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
            />
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-10 py-8">
            <Icon size={32} strokeWidth={1} />
            <p className="text-[10px] mt-1 font-mono uppercase">비어 있음</p>
          </div>
        )}
      </div>
    </div>
  );
}
