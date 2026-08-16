import { FootData, FootZone, DayRecord, ZoneStatus } from './types';

const createZones = (side: 'left' | 'right', healthBias = 0.8): FootZone[] => {
  const basePressure = () => Math.floor(Math.random() * 40 + (1 - healthBias) * 50);
  const getStatus = (p: number): ZoneStatus => {
    if (p > 75) return 'danger';
    if (p > 50) return 'warning';
    return 'safe';
  };

  const zones = [
    { id: 'bigToe' as const, label: 'Big Toe' },
    { id: 'innerBall' as const, label: 'Inner Ball' },
    { id: 'outerBall' as const, label: 'Outer Ball' },
    { id: 'heel' as const, label: 'Heel' },
  ];

  return zones.map((z) => {
    const pressure = Math.min(100, Math.max(0, basePressure()));
    return {
      ...z,
      pressure,
      status: getStatus(pressure),
    };
  });
};

export const generateMockFootData = (healthy = true): FootData => {
  const bias = healthy ? 0.85 : 0.4;
  const left = createZones('left', bias);
  const right = createZones('right', bias);

  const avgPressure =
    [...left, ...right].reduce((sum, z) => sum + z.pressure, 0) / 8;
  const overallHealth = Math.max(0, Math.min(100, Math.round(100 - avgPressure * 0.9)));

  return {
    left,
    right,
    overallHealth,
    streakDays: healthy ? 7 : 2,
    lastAlert: overallHealth < 60 ? 'Left heel pressure high!' : undefined,
  };
};

export const generateFamilyHistory = (): DayRecord[] => {
  const days: DayRecord[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const score = 70 + Math.floor(Math.random() * 30);
    days.push({
      date: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      healthScore: score,
      safe: score >= 80,
      badges: score >= 90 ? ['Golden Step'] : score >= 80 ? ['Safe Walker'] : [],
    });
  }
  return days;
};

export const INITIAL_DATA = generateMockFootData(true);