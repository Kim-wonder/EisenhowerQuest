'use client';

import { useState, useEffect } from 'react';
import { GameState, Task, Quadrant, XP_REWARDS, LEVEL_UP_THRESHOLD } from '../types';

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gamified_todo_state');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to load state', e);
        }
      }
    }
    return {
      xp: 0,
      level: 1,
      tasks: [],
    };
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gamified_todo_state', JSON.stringify(state));
    }
  }, [state, isLoaded]);

  const addTask = (text: string, quadrant: Quadrant) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      quadrant,
      completed: false,
      createdAt: Date.now(),
    };
    setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  };

  const completeTask = (id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (!task || task.completed) return;

    const xpGain = XP_REWARDS[task.quadrant];
    let newXp = state.xp + xpGain;
    let newLevel = state.level;

    while (newXp >= LEVEL_UP_THRESHOLD) {
      newXp -= LEVEL_UP_THRESHOLD;
      newLevel += 1;
    }

    setState(prev => ({
      ...prev,
      xp: newXp,
      level: newLevel,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: true } : t),
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id),
    }));
  };

  return {
    state,
    isLoaded,
    addTask,
    completeTask,
    deleteTask,
  };
};
