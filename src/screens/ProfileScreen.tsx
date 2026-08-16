import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../utils/theme';
import GiantButton from '../components/GiantButton';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../i18n/languages';

const ProfileScreen: React.FC = () => {
  const { patient, logout, isAuthenticated } = useAuth();
  const { language, tr } = useLanguage();

  const langLabel =
    LANGUAGES.find((l) => l.code === language)?.label || language;

  const handleLogout = () => {
    Alert.alert(
      tr('logOutQuestion'),
      tr('logOutWarning'),
      [
        { text: tr('cancel'), style: 'cancel' },
        {
          text: tr('logOut'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  if (!patient) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>👤</Text>
          <Text style={styles.emptyTitle}>{tr('noProfileYet')}</Text>
          <Text style={styles.emptyText}>{tr('noProfileText')}</Text>
          <GiantButton
            title={tr('logOutAndRegister')}
            onPress={handleLogout}
            color={COLORS.neonBlue}
            textColor="#000"
            style={{ marginTop: 24, alignSelf: 'stretch', marginHorizontal: 24 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  const Row = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
      <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header card */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {patient.name ? patient.name.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <Text style={styles.name}>{patient.name || tr('user')}</Text>
          <Text style={styles.phone}>+91 {patient.phone}</Text>
          {patient.diabetesType ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{patient.diabetesType}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.section}>{tr('personal')}</Text>
        <View style={styles.card}>
          <Row label={tr('fullName')} value={patient.name} />
          <Row label={tr('age')} value={patient.age ? `${patient.age} ${tr('years')}` : undefined} />
          <Row label={tr('gender')} value={patient.gender} />
          <Row label={tr('weight')} value={patient.weight ? `${patient.weight} ${tr('kg')}` : undefined} />
          <Row label={tr('height')} value={patient.height ? `${patient.height} ${tr('cm')}` : undefined} />
          <Row label={tr('bloodType')} value={patient.bloodType} />
        </View>

        <Text style={styles.section}>{tr('medicalHistorySection')}</Text>
        <View style={styles.card}>
          <Row label={tr('diabetesType')} value={patient.diabetesType} />
          <Row label={tr('duration')} value={patient.diabetesDuration} />
          <Row label={tr('familyHistory')} value={patient.familyHistory} />
          <Row label={tr('otherConditions')} value={patient.otherConditions} />
        </View>

        <Text style={styles.section}>{tr('emergencyContactSection')}</Text>
        <View style={styles.card}>
          <Row label={tr('name')} value={patient.emergencyContact} />
          <Row
            label={tr('phone')}
            value={
              patient.emergencyPhone ? `+91 ${patient.emergencyPhone}` : undefined
            }
          />
        </View>

        <Text style={styles.section}>{tr('appSection')}</Text>
        <View style={styles.card}>
          <Row label={tr('language')} value={langLabel} />
          <Row label={tr('registeredMobile')} value={`+91 ${patient.phone}`} />
        </View>

        <View style={styles.actions}>
          <GiantButton
            title={tr('logOut')}
            onPress={handleLogout}
            color={COLORS.neonRed}
            textColor="#FFF"
          />
        </View>

        <Text style={styles.footerNote}>{tr('dataStoredNote')}</Text>
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
  headerCard: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    borderWidth: 3,
    borderColor: COLORS.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: COLORS.neonGreen,
    fontSize: 32,
    fontWeight: '900',
  },
  name: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
  },
  phone: {
    color: COLORS.neonBlue,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
  },
  badgeText: {
    color: COLORS.neonGreen,
    fontWeight: '800',
    fontSize: 13,
  },
  section: {
    color: COLORS.neonBlue,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    marginHorizontal: 16,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  rowLabel: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  rowValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    flex: 1.4,
    textAlign: 'right',
  },
  actions: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  footerNote: {
    color: COLORS.lightGray,
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 28,
    marginTop: 16,
    lineHeight: 18,
    opacity: 0.7,
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  emptyTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
  },
  emptyText: {
    color: COLORS.lightGray,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
});

export default ProfileScreen;