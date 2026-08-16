export type AppThemeMode = 'dark' | 'light';

export const THEME_PALETTE = {
  dark: {
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
  },
  light: {
    background: '#F3F7FF',
    cardBg: '#FFFFFF',
    neonGreen: '#22C55E',
    neonYellow: '#F59E0B',
    neonRed: '#EF4444',
    neonBlue: '#2563EB',
    neonPurple: '#8B5CF6',
    white: '#111827',
    lightGray: '#6B7280',
    darkGray: '#E5E7EB',
    textPrimary: '#111827',
    textSecondary: '#374151',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
} as const;

export type ThemeColors = {
  [K in keyof typeof THEME_PALETTE.dark]: string;
};

export const COLORS: ThemeColors = { ...THEME_PALETTE.dark };

export const ZONE_COLORS: Record<ZoneStatus, string> = {
  safe: THEME_PALETTE.dark.neonGreen,
  warning: THEME_PALETTE.dark.neonYellow,
  danger: THEME_PALETTE.dark.neonRed,
};

export const setAppTheme = (mode: AppThemeMode) => {
  const next = THEME_PALETTE[mode];

  Object.keys(COLORS).forEach((key) => {
    const typedKey = key as keyof ThemeColors;
    (COLORS as Record<string, string>)[typedKey] = next[typedKey];
  });

  ZONE_COLORS.safe = next.neonGreen;
  ZONE_COLORS.warning = next.neonYellow;
  ZONE_COLORS.danger = next.neonRed;
};

export const FONTS = {
  regular: 'System',
  bold: 'System',
};

export type ZoneStatus = 'safe' | 'warning' | 'danger';