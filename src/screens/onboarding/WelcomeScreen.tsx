import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GiantButton from '../../components/GiantButton';
import { COLORS, THEME_PALETTE } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

interface Props {
  navigation: any;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { skipOnboarding } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const palette = themeMode === 'dark' ? THEME_PALETTE.dark : THEME_PALETTE.light;

  const handleSkip = async () => {
    await skipOnboarding();
  };

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: palette.background,
        },
        container: {
          flex: 1,
          paddingHorizontal: 24,
        },
        topRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 12,
          paddingBottom: 8,
        },
        themeToggle: {
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
        },
        themeToggleText: {
          color: palette.white,
          fontSize: 12,
          fontWeight: '800',
        },
        skipBtn: {
          color: palette.neonBlue,
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
          borderColor: palette.neonGreen,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        },
        logoEmoji: {
          fontSize: 52,
        },
        appName: {
          color: palette.white,
          fontSize: 32,
          fontWeight: '900',
          letterSpacing: 0.5,
        },
        tagline: {
          color: palette.neonGreen,
          fontSize: 16,
          fontWeight: '700',
          marginTop: 6,
        },
        subtitle: {
          color: palette.lightGray,
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
          backgroundColor: palette.cardBg,
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
          color: palette.white,
          fontSize: 15,
          fontWeight: '600',
          flex: 1,
        },
        cta: {
          marginTop: 'auto',
          marginBottom: 36,
        },
        secureNote: {
          color: palette.lightGray,
          fontSize: 13,
          textAlign: 'center',
          marginTop: 16,
          opacity: 0.8,
        },
      }),
    [palette]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={COLORS.background}
      />
      <LinearGradient
        colors={themeMode === 'dark' ? ['#0A0E17', '#0F172A', '#0A0E17'] : ['#E0F2FE', '#F8FAFC', '#E2E8F0']}
        style={styles.container}
      >
        <View style={styles.topRow}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}</Text>
          </TouchableOpacity>
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

export default WelcomeScreen;