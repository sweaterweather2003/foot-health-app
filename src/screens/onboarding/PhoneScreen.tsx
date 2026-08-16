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
import { COLORS, THEME_PALETTE } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface Props {
  navigation: any;
}

const PhoneScreen: React.FC<Props> = ({ navigation }) => {
  const { skipOnboarding } = useAuth();
  const { tr } = useLanguage();
  const { themeMode, toggleTheme } = useTheme();
  const palette = themeMode === 'dark' ? THEME_PALETTE.dark : THEME_PALETTE.light;
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

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        safe: { flex: 1, backgroundColor: palette.background },
        container: { flex: 1, paddingHorizontal: 24 },
        skipRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
        themeToggle: {
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.15)',
        },
        themeToggleText: { color: palette.white, fontSize: 12, fontWeight: '800' },
        skipBtn: { color: palette.neonBlue, fontSize: 15, fontWeight: '700' },
        content: { flex: 1, justifyContent: 'center', marginTop: -40 },
        step: { color: palette.neonBlue, fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
        title: { color: palette.white, fontSize: 28, fontWeight: '900' },
        subtitle: { color: palette.lightGray, fontSize: 15, marginTop: 10, lineHeight: 22 },
        inputRow: { flexDirection: 'row', marginTop: 32, alignItems: 'center' },
        prefix: { backgroundColor: palette.cardBg, paddingHorizontal: 16, paddingVertical: 18, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, borderWidth: 2, borderRightWidth: 0, borderColor: palette.neonBlue },
        prefixText: { color: palette.white, fontSize: 18, fontWeight: '700' },
        input: { flex: 1, backgroundColor: palette.cardBg, paddingHorizontal: 18, paddingVertical: 18, borderTopRightRadius: 16, borderBottomRightRadius: 16, borderWidth: 2, borderLeftWidth: 0, borderColor: palette.neonBlue, color: palette.white, fontSize: 20, fontWeight: '700', letterSpacing: 2 },
        error: { color: palette.neonRed, marginTop: 12, fontSize: 14, fontWeight: '600' },
        hint: { color: palette.lightGray, fontSize: 13, marginTop: 20, opacity: 0.7 },
        footer: { marginBottom: 36 },
      }),
    [palette]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={palette.background} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Skip */}
        <View style={styles.skipRow}>
          <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
            <Text style={styles.themeToggleText}>{themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}</Text>
          </TouchableOpacity>
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

export default PhoneScreen;