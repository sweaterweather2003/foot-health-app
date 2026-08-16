import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppThemeMode, setAppTheme } from '../utils/theme';

interface ThemeContextType {
  themeMode: AppThemeMode;
  setThemeMode: (mode: AppThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const safeGetThemeMode = async (): Promise<AppThemeMode> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const raw = await AsyncStorage.getItem('@footpower_theme');
    if (raw === 'light' || raw === 'dark') return raw;
  } catch (_) {}
  return 'dark';
};

const safeSetThemeMode = async (mode: AppThemeMode) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('@footpower_theme', mode);
  } catch (_) {}
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<AppThemeMode>('dark');

  useEffect(() => {
    safeGetThemeMode().then((mode) => {
      setThemeModeState(mode);
      setAppTheme(mode);
    });
  }, []);

  const setThemeMode = (mode: AppThemeMode) => {
    setThemeModeState(mode);
    setAppTheme(mode);
    safeSetThemeMode(mode);
  };

  const toggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
