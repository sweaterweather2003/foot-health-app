import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GiantButton from '../../components/GiantButton';
import { COLORS } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LANGUAGES, LanguageCode } from '../../i18n/languages';
import * as Haptics from 'expo-haptics';

interface Props {
  navigation: any;
}

const LanguageScreen: React.FC<Props> = ({ navigation }) => {
  const { skipOnboarding } = useAuth();
  const { language, setLanguage, tr } = useLanguage();

  const select = (code: LanguageCode) => {
    setLanguage(code);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_) {}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.skipRow}>
        <TouchableOpacity onPress={skipOnboarding}>
          <Text style={styles.skipBtn}>{tr('skipTest')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.emoji}>🌐</Text>
        <Text style={styles.title}>{tr('chooseLanguage')}</Text>
        <Text style={styles.subtitle}>
          Select the language you are most comfortable with
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {LANGUAGES.map((lang) => {
          const selected = language === lang.code;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langCard, selected && styles.langCardSelected]}
              onPress={() => select(lang.code)}
              activeOpacity={0.7}
            >
              <View style={styles.langLeft}>
                <Text style={[styles.langLabel, selected && styles.langLabelSelected]}>
                  {lang.label}
                </Text>
                <Text style={styles.langEnglish}>{lang.englishName}</Text>
              </View>
              {selected && (
                <View style={styles.check}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <GiantButton
          title={tr('continue')}
          onPress={() => navigation.navigate('Phone')}
          color={COLORS.neonGreen}
          textColor="#000"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  skipBtn: {
    color: COLORS.neonBlue,
    fontSize: 15,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  langCardSelected: {
    borderColor: COLORS.neonGreen,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  langLeft: {
    flex: 1,
  },
  langLabel: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },
  langLabelSelected: {
    color: COLORS.neonGreen,
  },
  langEnglish: {
    color: COLORS.lightGray,
    fontSize: 13,
    marginTop: 2,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '900',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    paddingTop: 8,
  },
});

export default LanguageScreen;