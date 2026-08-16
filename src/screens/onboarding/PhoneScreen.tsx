import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import GiantButton from '../../components/GiantButton';
import { COLORS } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface Props {
  navigation: any;
}

const PhoneScreen: React.FC<Props> = ({ navigation }) => {
  const { skipOnboarding } = useAuth();
  const { tr } = useLanguage();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError(tr('pleaseEnterValidMobile'));
      return;
    }
    setError('');
    // Pass phone to OTP screen
    navigation.navigate('OTP', { phone: cleaned });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Skip */}
        <View style={styles.skipRow}>
          <TouchableOpacity onPress={skipOnboarding}>
            <Text style={styles.skipBtn}>{tr('skipTest')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.step}>{tr('step_1_of_3')}</Text>
          <Text style={styles.title}>{tr('mobileNumber')}</Text>
          <Text style={styles.subtitle}>{tr('otpSentText')}</Text>

          <View style={styles.inputRow}>
            <View style={styles.prefix}>
              <Text style={styles.prefixText}>+91</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="98765 43210"
              placeholderTextColor={COLORS.lightGray}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={(t) => {
                setPhone(t.replace(/\D/g, ''));
                setError('');
              }}
              autoFocus
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.hint}>{tr('demoTip')}</Text>
        </View>

        <View style={styles.footer}>
          <GiantButton
            title={tr('sendOtp')}
            onPress={handleContinue}
            color={COLORS.neonGreen}
            textColor="#000"
            disabled={phone.length < 10}
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
  inputRow: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
  },
  prefix: {
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderWidth: 2,
    borderRightWidth: 0,
    borderColor: COLORS.neonBlue,
  },
  prefixText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: COLORS.neonBlue,
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  error: {
    color: COLORS.neonRed,
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  hint: {
    color: COLORS.lightGray,
    fontSize: 13,
    marginTop: 20,
    opacity: 0.7,
  },
  footer: {
    marginBottom: 36,
  },
});

export default PhoneScreen;