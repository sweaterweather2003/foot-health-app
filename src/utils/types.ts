export type ZoneId = 'bigToe' | 'innerBall' | 'outerBall' | 'heel';

export type ZoneStatus = 'safe' | 'warning' | 'danger';

export interface FootZone {
  id: ZoneId;
  label: string;
  status: ZoneStatus;
  pressure: number; // 0-100
}

export interface FootData {
  left: FootZone[];
  right: FootZone[];
  overallHealth: number; // 0-100
  streakDays: number;
  lastAlert?: string;
}

export interface DayRecord {
  date: string;
  healthScore: number;
  safe: boolean;
  badges: string[];
}