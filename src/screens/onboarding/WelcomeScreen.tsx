import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GiantButton from '../../components/GiantButton';
import { COLORS } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { skipOnboarding } = useAuth();

  const handleSkip = async () => {
    await skipOnboarding();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <LinearGradient
        colors={['#0A0E17', '#0F172A', '#0A0E17']}
        style={styles.container}
      >
        {/* Skip button */}
        <View style={styles.skipRow}>
          <Text style={styles.skipBtn} onPress={handleSkip}>
            Skip → Test Sensors
          </Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoEmoji}>🦶</Text>
          </View>
          <Text style={styles.appName}>Foot Power Meter</Text>
          <Text style={styles.tagline}>Tamagotchi for your Feet</Text>
          <Text style={styles.subtitle}>
            Keep your feet happy, green & powered up.{'\n'}
            Designed for rural & elderly patients.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🟢</Text>
            <Text style={styles.featureText}>Real-time foot health rings</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🗣️</Text>
            <Text style={styles.featureText}>Caring voice alerts in your language</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👨‍👩‍👧</Text>
            <Text style={styles.featureText}>Family guardian alerts</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.cta}>
          <GiantButton
            title="Get Started →"
            onPress={() => navigation.navigate('Language')}
            color={COLORS.neonGreen}
            textColor="#000"
          />
          <Text style={styles.secureNote}>
            Your data stays private • OTP verified
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  skipRow: {
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingBottom: 8,
  },
  skipBtn: {
    color: COLORS.neonBlue,
    fontSize: 15,
    fontWeight: '700',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  hero: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(57, 255, 20, 0.12)',
    borderWidth: 3,
    borderColor: COLORS.neonGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 52,
  },
  appName: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagline: {
    color: COLORS.neonGreen,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 22,
  },
  features: {
    marginTop: 40,
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  featureIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  featureText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  cta: {
    marginTop: 'auto',
    marginBottom: 36,
  },
  secureNote: {
    color: COLORS.lightGray,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 16,
    opacity: 0.8,
  },
});

export default WelcomeScreen;