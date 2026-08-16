import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS, THEME_PALETTE } from '../utils/theme';
import GiantButton from '../components/GiantButton';
import { generateFamilyHistory } from '../utils/mockData';
import { DayRecord } from '../utils/types';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const FamilyScreen: React.FC = () => {
  const { tr } = useLanguage();
  const { themeMode, toggleTheme } = useTheme();
  const palette = themeMode === 'dark' ? THEME_PALETTE.dark : THEME_PALETTE.light;
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [criticalAlert, setCriticalAlert] = useState(false);

  useEffect(() => {
    setHistory(generateFamilyHistory());
    // Demo: randomly show critical alert after a few seconds
    const t = setTimeout(() => {
      if (Math.random() > 0.6) {
        setCriticalAlert(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const callDad = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // In real app: Linking.openURL('tel:+91XXXXXXXXXX');
    Alert.alert(
      'Calling Dad',
      'This would dial the registered number immediately.\n\n(Demo mode – no real call placed)',
      [{ text: 'OK' }]
    );
  };

  const safeDays = history.filter((d) => d.safe).length;

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safe: { flex: 1, backgroundColor: palette.background },
        scroll: { paddingBottom: 40 },
        headerRow: { paddingHorizontal: 20, paddingTop: 12, alignItems: 'flex-start' },
        themeToggle: {
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
        },
        themeToggleText: { color: palette.white, fontSize: 12, fontWeight: '800' },
        header: { paddingHorizontal: 20, paddingTop: 16, alignItems: 'center' },
        title: { color: palette.white, fontSize: 26, fontWeight: '900' },
        subtitle: { color: palette.lightGray, fontSize: 14, marginTop: 4 },
        summaryCard: {
          marginHorizontal: 16,
          marginTop: 20,
          backgroundColor: palette.cardBg,
          borderRadius: 24,
          padding: 24,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'rgba(57, 255, 20, 0.3)',
        },
        summaryEmoji: { fontSize: 48, marginBottom: 8 },
        summaryTitle: { color: palette.neonGreen, fontSize: 20, fontWeight: '800', textAlign: 'center' },
        summaryScore: { color: palette.lightGray, fontSize: 15, marginTop: 6 },
        criticalBanner: {
          marginHorizontal: 16,
          marginTop: 16,
          backgroundColor: 'rgba(255, 7, 58, 0.15)',
          borderRadius: 20,
          padding: 20,
          borderWidth: 2,
          borderColor: palette.neonRed,
        },
        criticalTitle: { color: palette.neonRed, fontSize: 18, fontWeight: '900', textAlign: 'center' },
        criticalText: { color: palette.white, fontSize: 15, textAlign: 'center', marginTop: 8, lineHeight: 22 },
        sectionTitle: { color: palette.neonBlue, fontSize: 13, fontWeight: '800', letterSpacing: 2, marginHorizontal: 20, marginTop: 28, marginBottom: 12 },
        timeline: {
          marginHorizontal: 16,
          backgroundColor: palette.cardBg,
          borderRadius: 20,
          padding: 12,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.08)',
        },
        dayRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
        dayLeft: { flex: 1 },
        dayDate: { color: palette.white, fontSize: 15, fontWeight: '700' },
        dayScore: { color: palette.lightGray, fontSize: 13, marginTop: 2 },
        dayRight: { alignItems: 'flex-end', gap: 4 },
        checkCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: palette.neonGreen, alignItems: 'center', justifyContent: 'center' },
        warnCircle: { backgroundColor: palette.neonYellow },
        checkMark: { color: '#000', fontSize: 18, fontWeight: '900' },
        warnMark: { color: '#000', fontSize: 18, fontWeight: '900' },
        badgeMini: { color: palette.neonYellow, fontSize: 11, fontWeight: '700' },
        actions: { marginHorizontal: 20, marginTop: 28 },
        privacyNote: { color: palette.lightGray, fontSize: 12, textAlign: 'center', marginHorizontal: 28, marginTop: 24, lineHeight: 18, opacity: 0.7 },
      }),
    [palette]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>{tr('guardianCorner')}</Text>
          <Text style={styles.subtitle}>{tr('familyView')}</Text>
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>👨‍👧</Text>
          <Text style={styles.summaryTitle}>{tr('dadSafe')}</Text>
          <Text style={styles.summaryScore}>
            {safeDays}/7 {tr('daysAbove80')}
          </Text>
        </View>

        {/* Critical Alert Banner */}
        {criticalAlert && (
          <View style={styles.criticalBanner}>
            <Text style={styles.criticalTitle}>{tr('criticalAlert')}</Text>
            <Text style={styles.criticalText}>
              {tr('dadIgnoredAlert')}
            </Text>
            <GiantButton
              title={tr('callDadNow')}
              onPress={callDad}
              color={COLORS.neonRed}
              textColor="#FFF"
              style={{ marginTop: 14 }}
            />
          </View>
        )}

        {/* Calendar Timeline */}
        <Text style={styles.sectionTitle}>{tr('thisWeek')}</Text>
        <View style={styles.timeline}>
          {history.map((day, idx) => (
            <View key={idx} style={styles.dayRow}>
              <View style={styles.dayLeft}>
                <Text style={styles.dayDate}>{day.date}</Text>
                <Text style={styles.dayScore}>{day.healthScore}% health</Text>
              </View>
              <View style={styles.dayRight}>
                {day.safe ? (
                  <View style={styles.checkCircle}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                ) : (
                  <View style={[styles.checkCircle, styles.warnCircle]}>
                    <Text style={styles.warnMark}>!</Text>
                  </View>
                )}
                {day.badges.length > 0 && (
                  <Text style={styles.badgeMini}>🏅 {day.badges[0]}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actions}>
          <GiantButton
            title={tr('callDad')}
            onPress={callDad}
            color={COLORS.neonBlue}
            textColor="#000"
          />
          <GiantButton
            title={tr('refreshStatus')}
            onPress={() => {
              setHistory(generateFamilyHistory());
              setCriticalAlert(false);
            }}
            color={COLORS.neonGreen}
            textColor="#000"
            style={{ marginTop: 14 }}
          />
        </View>

        <Text style={styles.privacyNote}>{tr('patientDataNote')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FamilyScreen;