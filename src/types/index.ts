export type Quadrant = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface Task {
  id: string;
  text: string;
  quadrant: Quadrant;
  completed: boolean;
  createdAt: number;
}

export interface GameState {
  xp: number;
  level: number;
  tasks: Task[];
}

export const XP_REWARDS: Record<Quadrant, number> = {
  Q1: 50,  // Urgent & Important
  Q2: 100, // Important & Not Urgent
  Q3: 20,  // Urgent & Not Important
  Q4: 10,  // Neither
};

export const LEVEL_UP_THRESHOLD = 500;
