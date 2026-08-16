import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/theme';
import FootAvatar from '../components/FootAvatar';
import HealthRing from '../components/HealthRing';
import GiantButton from '../components/GiantButton';
import AlertBanner from '../components/AlertBanner';
import { generateMockFootData } from '../utils/mockData';
import { FootData } from '../utils/types';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../i18n/translations';
import * as Haptics from 'expo-haptics';

const DashboardScreen: React.FC = () => {
  const { language, tr, speak } = useLanguage();
  const [data, setData] = useState<FootData>(generateMockFootData(true));
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const refreshData = useCallback((healthy = true) => {
    const newData = generateMockFootData(healthy);
    setData(newData);

    if (newData.overallHealth < 50) {
      const msg = t('voice_sitDown', language);
      setLastMessage(msg);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else if (newData.overallHealth < 75) {
      const msg = t('voice_heelOxygen', language);
      setLastMessage(msg);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } else {
      setLastMessage(null);
    }
  }, [language]);

  useEffect(() => {
    // Simulate live updates every 8 seconds for demo
    const interval = setInterval(() => {
      // Occasionally introduce mild strain for demo
      const healthy = Math.random() > 0.35;
      refreshData(healthy);
    }, 8000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const speakStatus = () => {
    const health = data.overallHealth;

    const msg =
      health >= 80
        ? t('voice_healthy_detail', language, { percent: health })
        : health >= 50
        ? t('voice_caution_detail', language, { percent: health })
        : t('voice_critical_detail', language, { percent: health });

    speak(msg, true);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return tr('goodMorning');
    if (hour < 17) return tr('goodAfternoon');
    return tr('goodEvening');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.title}>Foot-Power Meter</Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakText}>🔥 {data.streakDays}-Day Safe Walker</Text>
          </View>
        </View>

        {/* Health Ring */}
        <View style={styles.ringContainer}>
          <HealthRing health={data.overallHealth} size={170} label={tr('footHealth')} />
        </View>

        {/* Alert if any */}
        {lastMessage && (
          <AlertBanner
            message={lastMessage}
            type={data.overallHealth < 50 ? 'danger' : 'warning'}
            speak={true}
            language={language}
          />
        )}

        {/* Foot Avatar */}
        <View style={styles.avatarCard}>
          <Text style={styles.sectionTitle}>{tr('yourFeetStatus')}</Text>
          <FootAvatar leftZones={data.left} rightZones={data.right} size={300} />
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.neonGreen }]} />
              <Text style={styles.legendText}>{tr('safe')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.neonYellow }]} />
              <Text style={styles.legendText}>{tr('warning')}</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.neonRed }]} />
              <Text style={styles.legendText}>{tr('danger')}</Text>
            </View>
          </View>
        </View>

        {/* Zone Details (simple cards instead of tables) */}
        <View style={styles.zonesRow}>
          <View style={styles.zoneCard}>
            <Text style={styles.zoneSide}>{tr('left')}</Text>
            {data.left.map((z) => (
              <View key={z.id} style={styles.zoneRow}>
                <Text style={styles.zoneLabel}>{z.label}</Text>
                <View
                  style={[
                    styles.zoneBadge,
                    {
                      backgroundColor:
                        z.status === 'safe'
                          ? COLORS.neonGreen
                          : z.status === 'warning'
                          ? COLORS.neonYellow
                          : COLORS.neonRed,
                    },
                  ]}
                >
                  <Text style={styles.zoneBadgeText}>{z.pressure}%</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.zoneCard}>
            <Text style={styles.zoneSide}>{tr('right')}</Text>
            {data.right.map((z) => (
              <View key={z.id} style={styles.zoneRow}>
                <Text style={styles.zoneLabel}>{z.label}</Text>
                <View
                  style={[
                    styles.zoneBadge,
                    {
                      backgroundColor:
                        z.status === 'safe'
                          ? COLORS.neonGreen
                          : z.status === 'warning'
                          ? COLORS.neonYellow
                          : COLORS.neonRed,
                    },
                  ]}
                >
                  <Text style={styles.zoneBadgeText}>{z.pressure}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <GiantButton
            title={tr('speakStatus')}
            onPress={speakStatus}
            color={COLORS.neonBlue}
            textColor="#000"
          />
          <GiantButton
            title={tr('refreshSensors')}
            onPress={() => refreshData(true)}
            color={COLORS.neonGreen}
            textColor="#000"
            style={{ marginTop: 14 }}
          />
          {data.overallHealth >= 80 && (
            <View style={styles.badgeUnlock}>
              <Text style={styles.badgeEmoji}>🏅</Text>
              <Text style={styles.badgeText}>{tr('goldenBadge')}</Text>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
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
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    alignItems: 'center',
  },
  greeting: {
    color: COLORS.lightGray,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  streakBadge: {
    marginTop: 10,
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
  },
  streakText: {
    color: COLORS.neonGreen,
    fontWeight: '700',
    fontSize: 14,
  },
  ringContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarCard: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)',
  },
  sectionTitle: {
    color: COLORS.neonBlue,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  legend: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: COLORS.lightGray,
    fontSize: 13,
    fontWeight: '600',
  },
  zonesRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  zoneCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  zoneSide: {
    color: COLORS.neonBlue,
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  zoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  zoneLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  zoneBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  zoneBadgeText: {
    color: '#000',
    fontWeight: '800',
    fontSize: 12,
  },
  actions: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  badgeUnlock: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.neonYellow,
  },
  badgeEmoji: {
    fontSize: 28,
  },
  badgeText: {
    color: COLORS.neonYellow,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default DashboardScreen;