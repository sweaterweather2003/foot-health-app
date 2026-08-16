export const COLORS = {
  background: '#0A0E17',
  cardBg: '#121826',
  neonGreen: '#39FF14',
  neonYellow: '#FFD700',
  neonRed: '#FF073A',
  neonBlue: '#00F5FF',
  neonPurple: '#BF00FF',
  white: '#FFFFFF',
  lightGray: '#A0AEC0',
  darkGray: '#2D3748',
  textPrimary: '#F7FAFC',
  textSecondary: '#CBD5E0',
  success: '#39FF14',
  warning: '#FFD700',
  danger: '#FF073A',
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
};

export type ZoneStatus = 'safe' | 'warning' | 'danger';

export const ZONE_COLORS: Record<ZoneStatus, string> = {
  safe: COLORS.neonGreen,
  warning: COLORS.neonYellow,
  danger: COLORS.neonRed,
};