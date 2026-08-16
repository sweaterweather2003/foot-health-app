import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GiantButton from '../../components/GiantButton';
import { COLORS } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import * as Haptics from 'expo-haptics';

interface Props {
  navigation: any;
  route: any;
}

const OTPScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phone } = route.params;
  const { skipOnboarding, login } = useAuth();
  const { tr } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef<(TextInput | null)[]>([]);
  const hasNavigated = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const verifyCode = useCallback(
    async (code: string) => {
      if (verifying || hasNavigated.current) return;

      if (code !== '123456') {
        setError(tr('incorrectOtp'));
        try {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } catch (_) {}
        return;
      }

      // Correct OTP → auto login & navigate
      setVerifying(true);
      setError('');
      hasNavigated.current = true;

      try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch (_) {}

      try {
        await login(phone);
      } catch (e) {
        console.log('login storage error (ignored)', e);
      }

      navigation.navigate('PatientInfo', { phone });
    },
    [verifying, login, phone, navigation]
  );

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);
    setError('');

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-verify when the 6th digit is entered
    if (text && index === 5) {
      const fullCode = newOtp.join('');
      if (fullCode.length === 6) {
        // Small delay so the last digit is visible before navigating
        setTimeout(() => {
          verifyCode(fullCode);
        }, 150);
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // Manual button still works as backup
  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      setError(tr('enterCompleteOtp'));
      return;
    }
    verifyCode(code);
  };

  const resend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    hasNavigated.current = false;
    setVerifying(false);
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_) {}
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.skipRow}>
          <TouchableOpacity onPress={skipOnboarding}>
            <Text style={styles.skipBtn}>{tr('skipTest')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.step}>{tr('step_2_of_3')}</Text>
          <Text style={styles.title}>{tr('enterOtp')}</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to{'\n'}
            <Text style={styles.phoneHighlight}>+91 {phone}</Text>
          </Text>

          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  error ? styles.otpBoxError : null,
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(t) => handleChange(t, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
                editable={!verifying}
              />
            ))}
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {verifying && !error ? (
            <Text style={styles.successText}>{tr('otpVerified')}</Text>
          ) : null}

          <View style={styles.resendRow}>
            {timer > 0 ? (
              <Text style={styles.timerText}>{tr('resendOtpIn', { seconds: timer })}</Text>
            ) : (
              <TouchableOpacity onPress={resend}>
                <Text style={styles.resendBtn}>{tr('resendOtp')}</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.demoHint}>{tr('demoOtp')}</Text>
        </View>

        <View style={styles.footer}>
          <GiantButton
            title={verifying ? tr('verifying') : tr('verifyContinue')}
            onPress={handleVerify}
            color={COLORS.neonGreen}
            textColor="#000"
            disabled={verifying}
          />
        </View>
      </KeyboardAvoidingView>
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
  },
  skipBtn: {
    color: COLORS.neonBlue,
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  step: {
    color: COLORS.neonBlue,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 15,
    marginTop: 10,
    lineHeight: 22,
  },
  phoneHighlight: {
    color: COLORS.neonGreen,
    fontWeight: '700',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
    gap: 8,
  },
  otpBox: {
    flex: 1,
    height: 58,
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: COLORS.neonGreen,
  },
  otpBoxError: {
    borderColor: COLORS.neonRed,
  },
  error: {
    color: COLORS.neonRed,
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  successText: {
    color: COLORS.neonGreen,
    marginTop: 14,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  resendRow: {
    marginTop: 24,
    alignItems: 'center',
  },
  timerText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
  resendBtn: {
    color: COLORS.neonBlue,
    fontSize: 15,
    fontWeight: '700',
  },
  demoHint: {
    color: COLORS.neonYellow,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.9,
  },
  footer: {
    marginBottom: 36,
  },
});

export default OTPScreen;