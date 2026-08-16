import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { LanguageCode, getSpeechCode } from '../i18n/languages';

interface Props {
  message: string;
  type?: 'warning' | 'danger' | 'info';
  speak?: boolean;
  language?: LanguageCode;
}

const AlertBanner: React.FC<Props> = ({
  message,
  type = 'warning',
  speak = true,
  language = 'en',
}) => {
  useEffect(() => {
    if (!speak || !message) return;

    const play = async () => {
      try {
        if (language !== 'en') {
          const tl = {
            en: 'en',
            hi: 'hi',
            kn: 'kn',
            te: 'te',
            ta: 'ta',
            mr: 'mr',
            bn: 'bn',
            gu: 'gu',
          }[language] || 'en';

          const url =
            'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=' +
            encodeURIComponent(message) +
            '&tl=' +
            tl;

          await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true, volume: 1.0 });
          return;
        }

        Speech.speak(message, {
          language: getSpeechCode(language),
          pitch: 1.05,
          rate: 0.9,
        });
      } catch (_) {
        Speech.speak(message, {
          language: getSpeechCode(language),
          pitch: 1.05,
          rate: 0.9,
        });
      }
    };

    play();
  }, [message, speak, language]);

  const bg =
    type === 'danger'
      ? COLORS.neonRed
      : type === 'warning'
      ? COLORS.neonYellow
      : COLORS.neonBlue;

  const textColor = type === 'warning' ? '#1A1A1A' : '#FFF';

  return (
    <View style={[styles.banner, { backgroundColor: bg }]}>
      <Text style={[styles.icon]}>{type === 'danger' ? '⚠️' : type === 'warning' ? '💛' : '💙'}</Text>
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    gap: 12,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
});

export default AlertBanner;