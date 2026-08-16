import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { LanguageCode, getSpeechCode } from '../i18n/languages';
import { t, TranslationKey } from '../i18n/translations';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  speak: (key: TranslationKey | string, isRaw?: boolean) => void;
  tr: (key: TranslationKey, params?: Record<string, string | number>) => string;
  speechCode: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

let memoryLang: LanguageCode = 'en';

const safeGetLang = async (): Promise<LanguageCode> => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const raw = await AsyncStorage.getItem('@footpower_lang');
    if (raw) return raw as LanguageCode;
  } catch (_) {}
  return memoryLang;
};

const safeSetLang = async (code: LanguageCode) => {
  memoryLang = code;
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    await AsyncStorage.setItem('@footpower_lang', code);
  } catch (_) {}
};

// Map our codes to Google Translate TTS language codes
const GOOGLE_TTS_LANG: Record<LanguageCode, string> = {
  en: 'en',
  hi: 'hi',
  kn: 'kn',
  te: 'te',
  ta: 'ta',
  mr: 'mr',
  bn: 'bn',
  gu: 'gu',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    safeGetLang().then(setLanguageState);
    // Allow playback in silent mode (important for phones)
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    }).catch(() => {});
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    safeSetLang(code);
  };

  const speechCode = getSpeechCode(language);
  const tr = (key: TranslationKey, params?: Record<string, string | number>) =>
    t(key, language, params);

  const stopAll = async () => {
    try {
      await Speech.stop();
    } catch (_) {}
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    } catch (_) {}
  };

  // Online TTS – works for Telugu, Kannada, etc. without installing voice packs
  const speakOnline = async (text: string, lang: LanguageCode) => {
    const tl = GOOGLE_TTS_LANG[lang] || 'en';
    // Google Translate TTS (free, no API key, works in Expo Go)
    const url =
      'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' +
      encodeURIComponent(text) +
      '&tl=' +
      tl;

    try {
      await stopAll();
      const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true, volume: 1.0 }
      );
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          soundRef.current = null;
        }
      });
    } catch (e) {
      console.log('Online TTS failed, falling back to device speech', e);
      // Last resort: device speech (may be English if voice pack missing)
      Speech.speak(text, { language: speechCode, pitch: 1.05, rate: 0.88 });
    }
  };

  const speak = async (keyOrText: TranslationKey | string, isRaw = false) => {
    const text = isRaw
      ? (keyOrText as string)
      : t(keyOrText as TranslationKey, language);

    if (!text) return;

    try {
      if (language !== 'en') {
        await speakOnline(text, language);
        return;
      }

      await stopAll();
      Speech.speak(text, {
        language: speechCode,
        pitch: 1.05,
        rate: 0.88,
      });
      return;
    } catch (e) {
      console.log('Primary speech route failed, trying fallback', e);
    }

    try {
      await speakOnline(text, language);
    } catch (e) {
      console.log('Online speech error', e);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, speak, tr, speechCode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};