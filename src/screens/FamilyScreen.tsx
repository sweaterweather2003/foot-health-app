import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { COLORS } from '../utils/theme';
import GiantButton from '../components/GiantButton';
import { generateFamilyHistory } from '../utils/mockData';
import { DayRecord } from '../utils/types';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '../context/LanguageContext';

const FamilyScreen: React.FC = () => {
  const { tr } = useLanguage();
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

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
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

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 14,
    marginTop: 4,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(57, 255, 20, 0.3)',
  },
  summaryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  summaryTitle: {
    color: COLORS.neonGreen,
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  summaryScore: {
    color: COLORS.lightGray,
    fontSize: 15,
    marginTop: 6,
  },
  criticalBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: 'rgba(255, 7, 58, 0.15)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.neonRed,
  },
  criticalTitle: {
    color: COLORS.neonRed,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  criticalText: {
    color: COLORS.white,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  sectionTitle: {
    color: COLORS.neonBlue,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  timeline: {
    marginHorizontal: 16,
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dayLeft: {
    flex: 1,
  },
  dayDate: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  dayScore: {
    color: COLORS.lightGray,
    fontSize: 13,
    marginTop: 2,
  },
  dayRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  checkCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warnCircle: {
    backgroundColor: COLORS.neonYellow,
  },
  checkMark: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
  },
  warnMark: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
  },
  badgeMini: {
    color: COLORS.neonYellow,
    fontSize: 11,
    fontWeight: '700',
  },
  actions: {
    marginHorizontal: 20,
    marginTop: 28,
  },
  privacyNote: {
    color: COLORS.lightGray,
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 28,
    marginTop: 24,
    lineHeight: 18,
    opacity: 0.7,
  },
});

export default FamilyScreen;