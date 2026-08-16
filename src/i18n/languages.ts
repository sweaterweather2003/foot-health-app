export type LanguageCode =
  | 'en'
  | 'hi'
  | 'kn'
  | 'te'
  | 'ta'
  | 'mr'
  | 'bn'
  | 'gu';

export interface LanguageOption {
  code: LanguageCode;
  label: string;       // Native name
  englishName: string;
  speechCode: string;  // For expo-speech
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', englishName: 'English', speechCode: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', englishName: 'Hindi', speechCode: 'hi-IN' },
  { code: 'kn', label: 'ಕನ್ನಡ', englishName: 'Kannada', speechCode: 'kn-IN' },
  { code: 'te', label: 'తెలుగు', englishName: 'Telugu', speechCode: 'te-IN' },
  { code: 'ta', label: 'தமிழ்', englishName: 'Tamil', speechCode: 'ta-IN' },
  { code: 'mr', label: 'मराठी', englishName: 'Marathi', speechCode: 'mr-IN' },
  { code: 'bn', label: 'বাংলা', englishName: 'Bengali', speechCode: 'bn-IN' },
  { code: 'gu', label: 'ગુજરાતી', englishName: 'Gujarati', speechCode: 'gu-IN' },
];

export const getSpeechCode = (code: LanguageCode): string => {
  return LANGUAGES.find((l) => l.code === code)?.speechCode || 'en-IN';
};