import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PatientProfile {
  phone: string;
  name: string;
  age: string;
  gender: string;
  diabetesType: string;
  diabetesDuration: string;
  familyHistory: string;
  bloodType: string;
  weight: string;
  height: string;
  otherConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  patient: PatientProfile | null;
  login: (phone: string) => Promise<void>;
  completeProfile: (profile: PatientProfile) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple in-memory storage that works even when AsyncStorage native module fails
let memoryStore: { phone?: string; profile?: PatientProfile | null; skipped?: boolean } = {};

const safeGet = async (): Promise<any> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const raw = await AsyncStorage.getItem('@footpower_auth');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // Native module missing or other error – fall back to memory
    console.log('AsyncStorage unavailable, using memory only');
  }
  return memoryStore;
};

const safeSet = async (data: any) => {
  memoryStore = data;
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('@footpower_auth', JSON.stringify(data));
  } catch (e) {
    // Ignore – memory is enough for the current session
  }
};

const safeRemove = async () => {
  memoryStore = {};
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.removeItem('@footpower_auth');
  } catch (e) {
    // Ignore
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState<PatientProfile | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await safeGet();
        if (data && (data.skipped || data.profile)) {
          setIsAuthenticated(true);
          setPatient(data.profile || null);
        }
      } catch (e) {
        console.log('Auth load error', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const login = async (phone: string) => {
    await safeSet({ phone, profile: null });
  };

  const completeProfile = async (profile: PatientProfile) => {
    await safeSet({ profile, skipped: false });
    setPatient(profile);
    setIsAuthenticated(true);
  };

  const skipOnboarding = async () => {
    await safeSet({ skipped: true, profile: null });
    setIsAuthenticated(true);
    setPatient(null);
  };

  const logout = async () => {
    await safeRemove();
    setIsAuthenticated(false);
    setPatient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        patient,
        login,
        completeProfile,
        skipOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};