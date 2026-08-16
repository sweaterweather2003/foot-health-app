import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import GiantButton from '../../components/GiantButton';
import { COLORS } from '../../utils/theme';
import { useAuth, PatientProfile } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import * as Haptics from 'expo-haptics';

interface Props {
  navigation: any;
  route: any;
}

const GENDERS = ['Male', 'Female', 'Other'];
const DIABETES_TYPES = ['Type 1', 'Type 2', 'Gestational', 'Prediabetes', 'None'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
const FAMILY_OPTIONS = ['Mother', 'Father', 'Sibling', 'Grandparent', 'None', 'Other'];

const PatientInfoScreen: React.FC<Props> = ({ route }) => {
  const { phone } = route.params;
  const { completeProfile, skipOnboarding } = useAuth();
  const { tr } = useLanguage();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diabetesType, setDiabetesType] = useState('');
  const [diabetesDuration, setDiabetesDuration] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [otherConditions, setOtherConditions] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const e: string[] = [];
    if (!name.trim()) e.push(tr('fullNameRequired'));
    if (!age || isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120) e.push(tr('validAgeRequired'));
    if (!gender) e.push(tr('selectGender'));
    if (!diabetesType) e.push(tr('selectDiabetesType'));
    setErrors(e);
    return e.length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    const profile: PatientProfile = {
      phone,
      name: name.trim(),
      age,
      gender,
      diabetesType,
      diabetesDuration,
      familyHistory,
      bloodType,
      weight,
      height,
      otherConditions,
      emergencyContact,
      emergencyPhone,
    };

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeProfile(profile);
  };

  const Chip = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header with Skip */}
        <View style={styles.header}>
          <View>
            <Text style={styles.step}>{tr('step_3_of_3')}</Text>
            <Text style={styles.title}>{tr('patientDetails')}</Text>
          </View>
          <TouchableOpacity onPress={skipOnboarding}>
            <Text style={styles.skipBtn}>{tr('skip')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionLabel}>{tr('personalInfo')}</Text>

          <Text style={styles.fieldLabel}>{tr('fullNameRequired').replace(' is required', ' *')}</Text>
          <TextInput
            style={styles.input}
            placeholder={tr('fullNamePlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            value={name}
            onChangeText={setName}
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.fieldLabel}>{tr('ageLabel')}</Text>
              <TextInput
                style={styles.input}
                placeholder={tr('agePlaceholder')}
                placeholderTextColor={COLORS.lightGray}
                keyboardType="number-pad"
                maxLength={3}
                value={age}
                onChangeText={setAge}
              />
            </View>
            <View style={styles.half}>
              <Text style={styles.fieldLabel}>{tr('weightLabel')}</Text>
              <TextInput
                style={styles.input}
                placeholder={tr('weightPlaceholder')}
                placeholderTextColor={COLORS.lightGray}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          <Text style={styles.fieldLabel}>{tr('genderLabel')}</Text>
          <View style={styles.chipRow}>
            {GENDERS.map((g) => (
              <Chip key={g} label={g} selected={gender === g} onPress={() => setGender(g)} />
            ))}
          </View>

          <Text style={styles.fieldLabel}>{tr('heightLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={tr('heightPlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            keyboardType="number-pad"
            value={height}
            onChangeText={setHeight}
          />

          <Text style={styles.sectionLabel}>{tr('medicalHistory')}</Text>

          <Text style={styles.fieldLabel}>{tr('diabetesTypeLabel')}</Text>
          <View style={styles.chipRow}>
            {DIABETES_TYPES.map((t) => (
              <Chip
                key={t}
                label={t}
                selected={diabetesType === t}
                onPress={() => setDiabetesType(t)}
              />
            ))}
          </View>

          <Text style={styles.fieldLabel}>{tr('diabetesDurationLabel')}</Text>
          <TextInput
            style={styles.input}
            placeholder={tr('diabetesDurationPlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            value={diabetesDuration}
            onChangeText={setDiabetesDuration}
          />

          <Text style={styles.fieldLabel}>{tr('familyHistory')}</Text>
          <View style={styles.chipRow}>
            {FAMILY_OPTIONS.map((f) => (
              <Chip
                key={f}
                label={f}
                selected={familyHistory === f}
                onPress={() => setFamilyHistory(f)}
              />
            ))}
          </View>

          <Text style={styles.fieldLabel}>{tr('bloodType')}</Text>
          <View style={styles.chipRow}>
            {BLOOD_TYPES.map((b) => (
              <Chip
                key={b}
                label={b}
                selected={bloodType === b}
                onPress={() => setBloodType(b)}
              />
            ))}
          </View>

          <Text style={styles.fieldLabel}>{tr('otherConditions')}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={tr('otherConditionsPlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            multiline
            numberOfLines={3}
            value={otherConditions}
            onChangeText={setOtherConditions}
          />

          <Text style={styles.sectionLabel}>{tr('emergencyContact')}</Text>

          <Text style={styles.fieldLabel}>{tr('contactName')}</Text>
          <TextInput
            style={styles.input}
            placeholder={tr('contactNamePlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />

          <Text style={styles.fieldLabel}>{tr('contactPhone')}</Text>
          <TextInput
            style={styles.input}
            placeholder={tr('contactPhonePlaceholder')}
            placeholderTextColor={COLORS.lightGray}
            keyboardType="phone-pad"
            maxLength={10}
            value={emergencyPhone}
            onChangeText={(t) => setEmergencyPhone(t.replace(/\D/g, ''))}
          />

          {errors.length > 0 && (
            <View style={styles.errorBox}>
              {errors.map((err, i) => (
                <Text key={i} style={styles.errorText}>
                  • {err}
                </Text>
              ))}
            </View>
          )}

          <View style={styles.submitWrap}>
            <GiantButton
              title={tr('completeRegistration')}
              onPress={handleSubmit}
              color={COLORS.neonGreen}
              textColor="#000"
            />
            <Text style={styles.privacy}>{tr('privacyText')}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  step: {
    color: COLORS.neonBlue,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 2,
  },
  skipBtn: {
    color: COLORS.neonBlue,
    fontSize: 15,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionLabel: {
    color: COLORS.neonBlue,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 28,
    marginBottom: 14,
  },
  fieldLabel: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  half: {
    flex: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipSelected: {
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    borderColor: COLORS.neonGreen,
  },
  chipText: {
    color: COLORS.lightGray,
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextSelected: {
    color: COLORS.neonGreen,
    fontWeight: '800',
  },
  errorBox: {
    backgroundColor: 'rgba(255, 7, 58, 0.12)',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.neonRed,
  },
  errorText: {
    color: COLORS.neonRed,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  submitWrap: {
    marginTop: 32,
  },
  privacy: {
    color: COLORS.lightGray,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
    opacity: 0.75,
  },
});

export default PatientInfoScreen;