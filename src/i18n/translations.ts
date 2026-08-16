import { LanguageCode } from './languages';

type TranslationKey =
  | 'welcomeTitle'
  | 'welcomeTagline'
  | 'getStarted'
  | 'skipTest'
  | 'chooseLanguage'
  | 'continue'
  | 'enterPhone'
  | 'sendOtp'
  | 'enterOtp'
  | 'verifyContinue'
  | 'patientDetails'
  | 'completeRegistration'
  | 'goodMorning'
  | 'goodAfternoon'
  | 'goodEvening'
  | 'footPowerMeter'
  | 'speakStatus'
  | 'refreshSensors'
  | 'goldenBadge'
  | 'safe'
  | 'warning'
  | 'danger'
  | 'yourFeetStatus'
  | 'left'
  | 'right'
  | 'steps'
  | 'good'
  | 'accuracy'
  | 'walkThisWay'
  | 'softHeel'
  | 'hardUneven'
  | 'startWalking'
  | 'stopAnalyze'
  | 'liveWalkerCam'
  | 'guardianCorner'
  | 'familyView'
  | 'dadSafe'
  | 'daysAbove80'
  | 'dadIgnoredAlert'
  | 'thisWeek'
  | 'criticalAlert'
  | 'callDadNow'
  | 'callDad'
  | 'refreshStatus'
  | 'patientDataNote'
  | 'liveWalkerTab'
  | 'familyTab'
  | 'dashboardTab'
  | 'skip'
  | 'step_1_of_3'
  | 'step_2_of_3'
  | 'step_3_of_3'
  | 'mobileNumber'
  | 'otpSentText'
  | 'pleaseEnterValidMobile'
  | 'demoTip'
  | 'otpVerified'
  | 'resendOtpIn'
  | 'resendOtp'
  | 'demoOtp'
  | 'incorrectOtp'
  | 'verifying'
  | 'enterCompleteOtp'
  | 'contactName'
  | 'contactPhone'
  | 'fullNameRequired'
  | 'validAgeRequired'
  | 'selectGender'
  | 'selectDiabetesType'
  | 'personalInfo'
  | 'medicalHistory'
  | 'emergencyContact'
  | 'fullNamePlaceholder'
  | 'agePlaceholder'
  | 'weightPlaceholder'
  | 'heightPlaceholder'
  | 'diabetesDurationPlaceholder'
  | 'otherConditionsPlaceholder'
  | 'contactNamePlaceholder'
  | 'contactPhonePlaceholder'
  | 'footHealth'
  | 'healthPercent'
  | 'male'
  | 'female'
  | 'other'
  | 'ageLabel'
  | 'weightLabel'
  | 'genderLabel'
  | 'heightLabel'
  | 'diabetesTypeLabel'
  | 'diabetesDurationLabel'
  | 'privacyText'
  | 'walkSubtitle'
  | 'walkTip'
  | 'noProfileYet'
  | 'noProfileText'
  | 'logOutAndRegister'
  | 'logOutQuestion'
  | 'logOutWarning'
  | 'cancel'
  | 'logOut'
  | 'personal'
  | 'medicalHistorySection'
  | 'emergencyContactSection'
  | 'appSection'
  | 'fullName'
  | 'age'
  | 'gender'
  | 'weight'
  | 'height'
  | 'bloodType'
  | 'diabetesType'
  | 'duration'
  | 'familyHistory'
  | 'otherConditions'
  | 'name'
  | 'phone'
  | 'language'
  | 'registeredMobile'
  | 'dataStoredNote'
  | 'user'
  | 'years'
  | 'kg'
  | 'cm'
  | 'voice_healthy'
  | 'voice_caution'
  | 'voice_critical'
  | 'voice_healthy_detail'
  | 'voice_caution_detail'
  | 'voice_critical_detail'
  | 'voice_sitDown'
  | 'voice_heelOxygen'
  | 'voice_walkStart'
  | 'voice_walkDone';

const en: Record<TranslationKey, string> = {
  welcomeTitle: 'Foot Power Meter',
  welcomeTagline: 'Tamagotchi for your Feet',
  getStarted: 'Get Started →',
  skipTest: 'Skip → Test Sensors',
  chooseLanguage: 'Choose Your Language',
  continue: 'Continue →',
  enterPhone: 'Enter Mobile Number',
  sendOtp: 'Send OTP →',
  enterOtp: 'Enter OTP',
  verifyContinue: 'Verify & Continue →',
  patientDetails: 'Patient Details',
  completeRegistration: 'Complete Registration ✓',
  goodMorning: 'Good Morning!',
  goodAfternoon: 'Good Afternoon!',
  goodEvening: 'Good Evening!',
  footPowerMeter: 'Foot-Power Meter',
  speakStatus: '🔊 Speak Status',
  refreshSensors: '🔄 Refresh Sensors',
  goldenBadge: 'Golden Step Badge Unlocked!',
  safe: 'Safe',
  warning: 'Warning',
  danger: 'Danger',
  yourFeetStatus: 'YOUR FEET STATUS',
  left: 'LEFT',
  right: 'RIGHT',
  steps: 'Steps',
  good: 'Good',
  accuracy: 'Accuracy',
  walkThisWay: '← Walk this way →',
  softHeel: 'Soft heel = Arcade Pop',
  hardUneven: 'Hard / uneven = Boing',
  startWalking: 'START WALKING',
  stopAnalyze: 'STOP & ANALYZE',
  liveWalkerCam: 'Live Walker Cam',
  guardianCorner: 'Guardian Corner',
  familyView: 'Family view • Keep loved ones safe',
  dadSafe: 'Dad kept his feet safe!',
  daysAbove80: 'days above 80% this week',
  dadIgnoredAlert: 'Dad has ignored a red alert for more than 15 minutes. Please check on him now.',
  thisWeek: 'THIS WEEK',
  criticalAlert: '🚨 CRITICAL ALERT',
  callDadNow: 'CALL DAD NOW',
  callDad: '📞 Call Dad',
  refreshStatus: '🔄 Refresh Status',
  patientDataNote: 'This screen is intended for family members. Patient data is only shared with consented contacts.',
  liveWalkerTab: 'Live Walker',
  familyTab: 'Guardian',
  dashboardTab: 'Foot Meter',
  skip: 'Skip',
  step_1_of_3: 'Step 1 of 3',
  step_2_of_3: 'Step 2 of 3',
  step_3_of_3: 'Step 3 of 3',
  mobileNumber: 'Enter Mobile Number',
  otpSentText: 'We’ll send a one-time password (OTP) to verify it’s you.',
  pleaseEnterValidMobile: 'Please enter a valid 10-digit mobile number',
  demoTip: 'Demo tip: Any 10-digit number works. OTP will be 123456.',
  otpVerified: 'OTP verified ✓ Taking you forward...',
  resendOtpIn: 'Resend OTP in {seconds}s',
  resendOtp: 'Resend OTP',
  demoOtp: 'Demo OTP: 123456',
  incorrectOtp: 'Incorrect OTP. Demo OTP is 123456',
  verifying: 'Verifying...',
  enterCompleteOtp: 'Please enter the complete 6-digit OTP',
  familyHistory: 'Family history of diabetes',
  bloodType: 'Blood Type',
  otherConditions: 'Other conditions (optional)',
  contactName: 'Contact Name',
  contactPhone: 'Contact Phone',
  fullNameRequired: 'Full name is required',
  validAgeRequired: 'Valid age is required',
  selectGender: 'Please select gender',
  selectDiabetesType: 'Please select diabetes type',
  personalInfo: 'PERSONAL INFORMATION',
  medicalHistory: 'DIABETES & MEDICAL HISTORY',
  emergencyContact: 'EMERGENCY CONTACT',
  fullNamePlaceholder: 'e.g. Ramesh Kumar',
  agePlaceholder: '65',
  weightPlaceholder: '70',
  heightPlaceholder: '165',
  diabetesDurationPlaceholder: 'e.g. 8 years / Since 2015',
  otherConditionsPlaceholder: 'Hypertension, neuropathy, kidney issues...',
  contactNamePlaceholder: 'e.g. Son / Daughter name',
  contactPhonePlaceholder: '98765 43210',
  footHealth: 'FOOT HEALTH',
  healthPercent: '{percent}% health',
  male: 'Male',
  female: 'Female',
  other: 'Other',
  ageLabel: 'Age *',
  weightLabel: 'Weight (kg)',
  genderLabel: 'Gender *',
  heightLabel: 'Height (cm)',
  diabetesTypeLabel: 'Diabetes Type *',
  diabetesDurationLabel: 'How long have you had diabetes?',
  privacyText: 'All information is stored securely on your device and shared only with consented family members.',
  walkSubtitle: 'Walk across the room. Soft, balanced steps light up green!',
  walkTip: 'Tip for ASHA workers: Use this screen when first fitting the smart shoes to teach balanced gait.',
  noProfileYet: 'No profile yet',
  noProfileText: 'You skipped registration. Create a profile next time you open the app, or log out and register now.',
  logOutAndRegister: 'Log out & Register',
  logOutQuestion: 'Log out?',
  logOutWarning: 'You will need to register or skip again to use the app.',
  cancel: 'Cancel',
  logOut: 'Log out',
  personal: 'PERSONAL',
  medicalHistorySection: 'MEDICAL HISTORY',
  emergencyContactSection: 'EMERGENCY CONTACT',
  appSection: 'APP',
  fullName: 'Full Name',
  age: 'Age',
  gender: 'Gender',
  weight: 'Weight',
  height: 'Height',
  diabetesType: 'Diabetes Type',
  duration: 'Duration',
  name: 'Name',
  phone: 'Phone',
  language: 'Language',
  registeredMobile: 'Registered Mobile',
  dataStoredNote: 'Your data is stored on this device and shared only with consented family members.',
  user: 'User',
  years: 'years',
  kg: 'kg',
  cm: 'cm',
  voice_healthy: 'Great job! Your feet are healthy. Keep walking balanced.',
  voice_caution: 'Caution. Please take a short rest. Your feet need a break.',
  voice_critical: 'Alert! Foot health is critical. Sit down immediately.',
  voice_healthy_detail: 'Great job! Your feet are {percent}% healthy. Keep walking balanced.',
  voice_caution_detail: 'Caution. Foot health is at {percent}%. Please take a short rest.',
  voice_critical_detail: 'Alert! Foot health is critical at {percent}%. Sit down immediately.',
  voice_sitDown: 'Beta, please sit down for a minute and drink some water. Your left heel is carrying too much weight.',
  voice_heelOxygen: 'Your left heel is running out of oxygen! Sit down for 3 minutes to recharge it!',
  voice_walkStart: 'Start walking. Watch the footsteps. Soft heel landings are best!',
  voice_walkDone: 'Great practice! Keep walking with soft, balanced steps.',
};

const hi: Record<TranslationKey, string> = {
  ...en,
  welcomeTitle: 'फुट पावर मीटर',
  chooseLanguage: 'अपनी भाषा चुनें',
  continue: 'आगे बढ़ें →',
  enterPhone: 'मोबाइल नंबर दर्ज करें',
  sendOtp: 'OTP भेजें →',
  enterOtp: 'OTP दर्ज करें',
  verifyContinue: 'सत्यापित करें →',
  patientDetails: 'मरीज़ की जानकारी',
  completeRegistration: 'पंजीकरण पूरा करें ✓',
  goodMorning: 'सुप्रभात!',
  goodAfternoon: 'नमस्कार!',
  goodEvening: 'शुभ संध्या!',
  footPowerMeter: 'फुट-पावर मीटर',
  speakStatus: '🔊 स्थिति बताएं',
  refreshSensors: '🔄 सेंसर रीफ्रेश करें',
  goldenBadge: 'गोल्डन स्टेप बैज अनलॉक!',
  safe: 'सुरक्षित',
  warning: 'चेतावनी',
  danger: 'खतरा',
  yourFeetStatus: 'आपके पैरों की स्थिति',
  left: 'बाएं',
  right: 'दाएं',
  steps: 'कदम',
  good: 'अच्छा',
  accuracy: 'सटीकता',
  walkThisWay: '← इस तरफ चलें →',
  softHeel: 'मुलायम एड़ी = आर्केड पॉप',
  hardUneven: 'कठोर / असमान = बुइंग',
  startWalking: 'चलना शुरू करें',
  stopAnalyze: 'रोकें और विश्लेषण करें',
  liveWalkerCam: 'लाइव वॉकर कैम',
  guardianCorner: 'गार्जियन कॉर्नर',
  familyView: 'परिवार देखें • प्रियजनों की सुरक्षा रखें',
  dadSafe: 'पिता ने अपने पैर सुरक्षित रखे!',
  daysAbove80: 'इस सप्ताह 80% से अधिक दिनों की संख्या',
  dadIgnoredAlert: 'पिता ने 15 मिनट से अधिक समय तक लाल चेतावनी को नजरअंदाज किया है। कृपया अभी उनका ध्यान रखें।',
  thisWeek: 'इस सप्ताह',
  criticalAlert: '🚨 गंभीर चेतावनी',
  callDadNow: 'अभी पिता को कॉल करें',
  callDad: '📞 पिता को कॉल करें',
  refreshStatus: '🔄 स्थिति रीफ्रेश करें',
  patientDataNote: 'यह स्क्रीन परिवार के सदस्यों के लिए है। रोगी का डेटा केवल सहमति वाले संपर्कों के साथ साझा किया जाता है।',
  liveWalkerTab: 'लाइव वॉकर',
  familyTab: 'गार्जियन',
  dashboardTab: 'फुट मीटर',
  skip: 'छोड़ें',
  step_1_of_3: 'स्टेप 1 का 3',
  step_2_of_3: 'स्टेप 2 का 3',
  step_3_of_3: 'स्टेप 3 का 3',
  mobileNumber: 'मोबाइल नंबर दर्ज करें',
  otpSentText: 'आपको सत्यापन के लिए एक बार का पासवर्ड (OTP) भेजा जाएगा।',
  pleaseEnterValidMobile: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें',
  demoTip: 'डेमो सुझाव: कोई भी 10 अंकों का नंबर काम करेगा। OTP 123456 होगा।',
  otpVerified: 'OTP सत्यापित ✓ आगे बढ़ रहे हैं...',
  resendOtpIn: '{seconds} सेकंड में OTP फिर से भेजें',
  resendOtp: 'OTP फिर से भेजें',
  demoOtp: 'डेमो OTP: 123456',
  incorrectOtp: 'गलत OTP। डेमो OTP 123456 है',
  verifying: 'सत्यापित किया जा रहा है...',
  enterCompleteOtp: 'कृपया पूरा 6-अंकीय OTP दर्ज करें',
  familyHistory: 'मधुमेह का पारिवारिक इतिहास',
  bloodType: 'रक्त समूह',
  otherConditions: 'अन्य स्थिति (वैकल्पिक)',
  contactName: 'संपर्क का नाम',
  contactPhone: 'संपर्क फोन',
  fullNameRequired: 'पूरा नाम आवश्यक है',
  validAgeRequired: 'सही उम्र आवश्यक है',
  selectGender: 'कृपया लिंग चुनें',
  selectDiabetesType: 'कृपया मधुमेह प्रकार चुनें',
  personalInfo: 'व्यक्तिगत जानकारी',
  medicalHistory: 'मधुमेह और चिकित्सा इतिहास',
  emergencyContact: 'आपातकालीन संपर्क',
  fullNamePlaceholder: 'उदा. रमेश कुमार',
  agePlaceholder: '65',
  weightPlaceholder: '70',
  heightPlaceholder: '165',
  diabetesDurationPlaceholder: 'उदा. 8 वर्ष / 2015 से',
  otherConditionsPlaceholder: 'हाइपरटेंशन, न्यूरोपैथी, किडनी समस्याएँ...',
  contactNamePlaceholder: 'उदा. बेटा / बेटी का नाम',
  contactPhonePlaceholder: '98765 43210',
  footHealth: 'पैर का स्वास्थ्य',
  healthPercent: '{percent}% स्वास्थ्य',
  male: 'पुरुष',
  female: 'महिला',
  other: 'अन्य',
  ageLabel: 'उम्र *',
  weightLabel: 'वजन (किलो)',
  genderLabel: 'लिंग *',
  heightLabel: 'ऊँचाई (सेमी)',
  diabetesTypeLabel: 'मधुमेह प्रकार *',
  diabetesDurationLabel: 'आपको कितने समय से मधुमेह है?',
  privacyText: 'सभी जानकारी आपके डिवाइस पर सुरक्षित रूप से संग्रहीत की जाती है और केवल सहमति वाले परिवार के सदस्यों के साथ साझा की जाती है।',
  walkSubtitle: 'कमरे के आर-पार चलें। नरम, संतुलित कदम हरे रंग में चमकते हैं!',
  walkTip: 'आशा कार्यकर्ताओं के लिए सुझाव: स्मार्ट जूते पहले फिट करते समय संतुलित चाल सिखाने के लिए इस स्क्रीन का उपयोग करें।',
  noProfileYet: 'अभी कोई प्रोफ़ाइल नहीं है',
  noProfileText: 'आपने पंजीकरण छोड़ दिया है। अगली बार ऐप खोलते समय प्रोफ़ाइल बनाएं, या बाहर निकलकर अभी रजिस्टर करें।',
  logOutAndRegister: 'लॉग आउट और रजिस्टर करें',
  logOutQuestion: 'लॉग आउट?',
  logOutWarning: 'ऐप का उपयोग करने के लिए आपको फिर से रजिस्टर या स्किप करना होगा।',
  cancel: 'रद्द करें',
  logOut: 'लॉग आउट',
  personal: 'व्यक्तिगत',
  medicalHistorySection: 'मेडिकल हिस्ट्री',
  emergencyContactSection: 'आपातकालीन संपर्क',
  appSection: 'ऐप',
  fullName: 'पूरा नाम',
  age: 'उम्र',
  gender: 'लिंग',
  weight: 'वजन',
  height: 'ऊँचाई',
  diabetesType: 'मधुमेह प्रकार',
  duration: 'अवधि',
  name: 'नाम',
  phone: 'फोन',
  language: 'भाषा',
  registeredMobile: 'पंजीकृत मोबाइल',
  dataStoredNote: 'आपका डेटा इस डिवाइस पर सुरक्षित रूप से संग्रहीत रहता है और केवल सहमति वाले परिवार के सदस्यों के साथ साझा किया जाता है।',
  user: 'उपयोगकर्ता',
  years: 'वर्ष',
  kg: 'किलो',
  cm: 'सेमी',
  voice_healthy: 'बहुत अच्छा! आपके पैर स्वस्थ हैं। संतुलित चलते रहें।',
  voice_caution: 'सावधान। कृपया थोड़ा आराम करें। आपके पैरों को ब्रेक चाहिए।',
  voice_critical: 'चेतावनी! पैरों की सेहत खराब है। तुरंत बैठ जाएं।',
  voice_healthy_detail: 'बहुत अच्छा! आपके पैर {percent}% स्वस्थ हैं। संतुलित चलते रहें।',
  voice_caution_detail: 'सावधान। आपके पैरों की सेहत {percent}% है। कृपया थोड़ा आराम करें।',
  voice_critical_detail: 'चेतावनी! पैरों की सेहत {percent}% है और यह गंभीर है। तुरंत बैठ जाएं।',
  voice_sitDown: 'बेटा, कृपया एक मिनट बैठ जाओ और पानी पी लो। आपके बाएं एड़ी पर बहुत वजन है।',
  voice_heelOxygen: 'आपकी बाईं एड़ी में ऑक्सीजन कम हो रही है! 3 मिनट बैठकर रिचार्ज करें!',
  voice_walkStart: 'चलना शुरू करें। पैरों के निशान देखें। एड़ी को धीरे रखें!',
  voice_walkDone: 'बहुत अच्छा अभ्यास! नरम और संतुलित कदम रखते रहें।',
};

const kn: Record<TranslationKey, string> = {
  ...en,
  welcomeTitle: 'ಫುಟ್ ಪವರ್ ಮೀಟರ್',
  chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  continue: 'ಮುಂದುವರಿಸಿ →',
  enterPhone: 'ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ',
  sendOtp: 'OTP ಕಳುಹಿಸಿ →',
  enterOtp: 'OTP ನಮೂದಿಸಿ',
  verifyContinue: 'ಪರಿಶೀಲಿಸಿ →',
  patientDetails: 'ರೋಗಿಯ ವಿವರಗಳು',
  completeRegistration: 'ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ ✓',
  goodMorning: 'ಶುಭೋದಯ!',
  goodAfternoon: 'ನಮಸ್ಕಾರ!',
  goodEvening: 'ಶುಭ ಸಂಜೆ!',
  footPowerMeter: 'ಫುಟ್-ಪವರ್ ಮೀಟರ್',
  speakStatus: '🔊 ಸ್ಥಿತಿ ಹೇಳಿ',
  refreshSensors: '🔄 ಸೆನ್ಸರ್ ರಿಫ್ರೆಶ್',
  goldenBadge: 'ಗೋಲ್ಡನ್ ಸ್ಟೆಪ್ ಬ್ಯಾಡ್ಜ್ ಅನ್‌ಲಾಕ್!',
  safe: 'ಸುರಕ್ಷಿತ',
  warning: 'ಎಚ್ಚರಿಕೆ',
  danger: 'ಅಪಾಯ',
  yourFeetStatus: 'ನಿಮ್ಮ ಪಾದಗಳ ಸ್ಥಿತಿ',
  left: 'ಎಡ',
  right: 'ಬಲ',
  steps: 'ಹೆಜ್ಜೆಗಳು',
  good: 'ಒಳ್ಳೆಯದು',
  accuracy: 'ನಿಖರತೆ',
  walkThisWay: '← ಈ ಕಡೆ ನಡೆಯಿರಿ →',
  softHeel: 'ಮೃದು ಎದ = ಆರ್ಕೇಡ್ ಪಾಪ್',
  hardUneven: 'ಕಠಿಣ / ಅಸಮ = ಬಾಯಿಂಗ್',
  startWalking: 'ನಡೆಯಲು ಪ್ರಾರಂಭಿಸಿ',
  stopAnalyze: 'ನಿಲ್ಲಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಿಸಿ',
  liveWalkerCam: 'ಲೈವ್ ವಾಕರ್ ಕ್ಯಾಮ್',
  guardianCorner: 'ಗಾರ್ಡಿಯನ್ ಕೋರ್ನರ್',
  familyView: 'ಕುಟುಂಬದ ದೃಶ್ಯ • ಪ್ರಿಯರ ಆರೋಗ್ಯ ಕಾಪಾಡಿ',
  dadSafe: 'ಅಪ್ಪ ತಮ್ಮ ಪಾದಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಕಾಪಾಡಿದ್ದಾರೆ!',
  daysAbove80: 'ಈ ವಾರ 80% ಹೆಚ್ಚು ದಿನಗಳು',
  dadIgnoredAlert: 'ಅಪ್ಪ 15 ನಿಮಿಷಕ್ಕೂ ಹೆಚ್ಚು ಸಮಯದಿಂದ ಕಪ್ಪು/ಕೆಂಪು ಎಚ್ಚರಿಕೆಯನ್ನು ನಿರ್ಲಕ್ಷಿಸಿದ್ದಾರೆ. ದಯವಿಟ್ಟು ಈಗ ಅವರನ್ನು ಪರಿಶೀಲಿಸಿ.',
  thisWeek: 'ಈ ವಾರ',
  criticalAlert: '🚨 ಗಂಭೀರ ಎಚ್ಚರಿಕೆ',
  callDadNow: 'ಇಗೋ ಅಪ್ಪನPhone ಮಾಡಿ',
  callDad: '📞 ಅಪ್ಪನನ್ನು ಕರೆ ಮಾಡಿ',
  refreshStatus: '🔄 ಸ್ಥಿತಿ ರಿಫ್ರೆಶ್ ಮಾಡಿ',
  patientDataNote: 'ಈ ಸ್ಕ್ರಿನ್ ಕುಟುಂಬ ಸದಸ್ಯರಿಗೆ ಉದ್ದೇಶಿತವಾಗಿದೆ. ರೋಗಿಯ ಡೇಟಾವನ್ನು ಕೇವಲ ಒಪ್ಪಿದ ಸಂಪರ್ಕಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.',
  liveWalkerTab: 'ಲೈವ್ ವಾಕರ್',
  familyTab: 'ಗಾರ್ಡಿಯನ್',
  dashboardTab: 'ಫುಟ್ ಮೀಟರ್',
  skip: 'ಸ್ಕಿಪ್',
  step_1_of_3: 'ಸ್ಥಿತಿ 1/3',
  step_2_of_3: 'ಸ್ಥಿತಿ 2/3',
  step_3_of_3: 'ಸ್ಥಿತಿ 3/3',
  mobileNumber: 'ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ',
  otpSentText: 'ನಿಮ್ಮ ಗುರುತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ಒನ್-ಟೈಮ್ ಪಾಸ್ವರ್ಡ್ (OTP) ಕಳುಹಿಸಲಾಗುತ್ತದೆ.',
  pleaseEnterValidMobile: 'ದಯವಿಟ್ಟು ಮಾನ್ಯ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ನಂಬರ್ ನಮೂದಿಸಿ',
  demoTip: 'ಡೆಮೋ ಟಿಪ್: ಯಾವುದೇ 10-ಅಂಕಿಯ ಸಂಖ್ಯೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ. OTP 123456 ಆಗಿದೆ.',
  otpVerified: 'OTP ಧೃಡೀಕರಿಸಲಾಗಿದೆ ✓ ನಿಮ್ಮ ಮುಂದಿನ ಹಂತಕ್ಕೆ...',
  resendOtpIn: '{seconds} ಸೆಕೆಂಡಳ ನಂತರ OTP ಮತ್ತೆ ಕಳುಹಿಸಿ',
  resendOtp: 'OTP ಮತ್ತೆ ಕಳುಹಿಸಿ',
  demoOtp: 'ಡೆಮೋ OTP: 123456',
  incorrectOtp: 'ತಪ್ಪಾದ OTP. ಡೆಮೋ OTP 123456',
  verifying: 'ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
  enterCompleteOtp: 'ದಯವಿಟ್ಟು ಸಂಪೂರ್ಣ 6-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ',
  familyHistory: 'ಮಧುಮೇಹದ ಕುಟುಂಬ ಇತಿಹಾಸ',
  bloodType: 'ರಕ್ತದ ಪ್ರಕಾರ',
  otherConditions: 'ಇತರೆ ಪರಿಸ್ಥಿತಿಗಳು (ಐಚ್ಛಿಕ)',
  contactName: 'ಸಂಪರ್ಕದ ಹೆಸರು',
  contactPhone: 'ಸಂಪರ್ಕದ ಫೋನ್',
  fullNameRequired: 'ಪೂರ್ಣ ಹೆಸರು ಅಗತ್ಯವಿದೆ',
  validAgeRequired: 'ಮಾನ್ಯ ವಯಸ್ಸು ಅಗತ್ಯವಿದೆ',
  selectGender: 'ದಯವಿಟ್ಟು ಲಿಂಗವನ್ನು ಆರಿಸಿ',
  selectDiabetesType: 'ದಯವಿಟ್ಟು ಡಯಾಬಿಟಿಸ್ ಪ್ರಕಾರವನ್ನು ಆರಿಸಿ',
  personalInfo: 'ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ',
  medicalHistory: 'ಮಧುಮೇಹ ಮತ್ತು ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ',
  emergencyContact: 'ತುರ್ತು ಸಂಪರ್ಕ',
  fullNamePlaceholder: 'ಉದಾ. ರಾಮೇಶ್ ಕುಮಾರ್',
  agePlaceholder: '65',
  weightPlaceholder: '70',
  heightPlaceholder: '165',
  diabetesDurationPlaceholder: 'ಉದಾ. 8 ವರ್ಷ / 2015 ರಿಂದ',
  otherConditionsPlaceholder: 'ಹೈಪರ್ಟೆನ್ಷನ್, ನ್ಯೂರೋಪತಿಯ, ಕಿಡ್ನಿ ಸಮಸ್ಯೆಗಳು...',
  contactNamePlaceholder: 'ಉದಾ. ಮಗ / ಮಗಳು ಹೆಸರು',
  contactPhonePlaceholder: '98765 43210',
  footHealth: 'ಪಾದ ಆರೋಗ್ಯ',
  healthPercent: '{percent}% ಆರೋಗ್ಯ',
  male: 'ಪುರುಷ',
  female: 'ಮಹಿಳೆ',
  other: 'ಇತರೆ',
  ageLabel: 'ವಯಸ್ಸು *',
  weightLabel: 'ವજન (ಕೆಜಿ)',
  genderLabel: 'ಲಿಂಗ *',
  heightLabel: 'ಎತ್ತರ (ಸೆಂ.ಮೀ)',
  diabetesTypeLabel: 'ಮಧುಮೇಹದ ಪ್ರಕಾರ *',
  diabetesDurationLabel: 'ನಿಮಗೆ ಎಷ್ಟು ಕಾಲದಿಂದ ಮಧುಮೇಹ ಇದೆ?',
  privacyText: 'ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ನಿಮ್ಮ ಸೆಲ್ಫೈಟ ಮೇಲೆ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಕೇವಲ ಒಪ್ಪಿದ ಕುಟುಂಬ ಸದಸ್ಯರೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲಾಗುತ್ತದೆ.',
  walkSubtitle: 'ಕೊಠಡಿಯಲ್ಲಿ ಓಡಾಡಿ. ಮೃದು, ಸಮತೋಲಿತ ಹೆಜ್ಜೆಗಳು ಹಸಿರಾಗಿ ಹೊಳೆಯುತ್ತವೆ!',
  walkTip: 'ಆಶಾ ಕಾರ್ಮಿಕರ ಸಲಹೆ: ಸ್ಮಾರ್ಟ್ ಶೂಗಳನ್ನು ಮೊದಲ ಬಾರಿಗೆ ಹೊಂದಿಸುವಾಗ ಸಮತೋಲಿತ ಹೆಜ್ಜೆಯನ್ನು ಕಲಿಸಲು ಈ ಸ್ಕ್ರೀನ್ ಅನ್ನು ಬಳಸಿ.',
  noProfileYet: 'ಇನ್ನೂ ಪ್ರೊಫೈಲ್ ಇಲ್ಲ',
  noProfileText: 'ನೀವು ನೋಂದಣಿ ಮಾಡುವುದನ್ನು ಬಿಟ್ಟುಬಿಟ್ಟಿದ್ದೀರಿ. ಆ್ಯಪ್ ಮರುಜಾರಿಸಿದಾಗ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ, ಅಥವಾ ಲಾಗ್ ಔಟ್ ಮಾಡಿ ಈಗಲೇ ನೋಂದಣಿಸಿ.',
  logOutAndRegister: 'ಲಾಗ್ ಔಟ್ & ನೋಂದಣಿ',
  logOutQuestion: 'ಲಾಗ್ ಔಟ್?',
  logOutWarning: 'ಆ್ಯಪ್ ಬಳಸಲು ನೀವು ಮತ್ತೊಮ್ಮೆ ನೋಂದಣಿ ಅಥವಾ ಸ್ಕಿಪ್ ಮಾಡಬೇಕು.',
  cancel: 'ರದ್ದುಮಾಡು',
  logOut: 'ಲಾಗ್ ಔಟ್',
  personal: 'ವೈಯಕ್ತಿಕ',
  medicalHistorySection: 'ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ',
  emergencyContactSection: 'ತುರ್ತು ಸಂಪರ್ಕ',
  appSection: 'ಆ್ಯಪ್',
  fullName: 'ಪೂರ್ಣ ಹೆಸರು',
  age: 'ವಯಸ್ಸು',
  gender: 'ಲಿಂಗ',
  weight: 'ವજન',
  height: 'ಎತ್ತರ',
  diabetesType: 'ಮಧುಮೇಹದ ಪ್ರಕಾರ',
  duration: 'ಅವಧಿ',
  name: 'ಹೆಸರು',
  phone: 'ಫೋನ್',
  language: 'ಭಾಷೆ',
  registeredMobile: 'ನೋಂದಾಯಿತ മൊಬೈಲ್',
  dataStoredNote: 'ನಿಮ್ಮ ಡೇಟಾ ಈ ಡಿವೈಸ್ನಲ್ಲಿ ಸಂಗ್ರಹ되고 ಕೇವಲ ಒಪ್ಪಿದ ಕುಟುಂಬ ಸದಸ್ಯರೊಂದಿಗೆ ಮಾತ್ರ ಹಂಚಿಕೊಳ್ಳಲ್ಪಡುತ್ತವೆ.',
  user: 'ಬಳಕೆದಾರ',
  years: 'ವರ್ಷಗಳು',
  kg: 'ಕೆಜಿ',
  cm: 'ಸೆಂ.ಮೀ',
  voice_healthy: 'ಚೆನ್ನಾಗಿದೆ! ನಿಮ್ಮ ಪಾದಗಳು ಆರೋಗ್ಯವಾಗಿವೆ. ಸಮತೋಲನದಿಂದ ನಡೆಯಿರಿ.',
  voice_caution: 'ಎಚ್ಚರಿಕೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
  voice_critical: 'ಎಚ್ಚರಿಕೆ! ಪಾದಗಳ ಆರೋಗ್ಯ ಕ್ಷೀಣವಾಗಿದೆ. ತಕ್ಷಣ ಕುಳಿತುಕೊಳ್ಳಿ.',
  voice_healthy_detail: 'ಚೆನ್ನಾಗಿದೆ! ನಿಮ್ಮ ಪಾದಗಳು {percent}% ಆರೋಗ್ಯವಾಗಿವೆ. ಸಮತೋಲನದಿಂದ ನಡೆಯಿರಿ.',
  voice_caution_detail: 'ಎಚ್ಚರಿಕೆ. ನಿಮ್ಮ ಪಾದಗಳ ಆರೋಗ್ಯ {percent}% ಆಗಿದೆ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
  voice_critical_detail: 'ಎಚ್ಚರಿಕೆ! ನಿಮ್ಮ ಪಾದಗಳ ಆರೋಗ್ಯ {percent}% ಆಗಿದೆ ಮತ್ತು ಇದು ಗಂಭೀರವಾಗಿದೆ. ತಕ್ಷಣ ಕುಳಿತುಕೊಳ್ಳಿ.',
  voice_sitDown: 'ಮಗು, ದಯವಿಟ್ಟು ಒಂದು ನಿಮಿಷ ಕುಳಿತು ನೀರು ಕುಡಿಯಿರಿ. ನಿಮ್ಮ ಎಡ ಹಿಮ್ಮಡಿಯ ಮೇಲೆ ಹೆಚ್ಚು ತೂಕವಿದೆ.',
  voice_heelOxygen: 'ನಿಮ್ಮ ಎಡ ಹಿಮ್ಮಡಿಗೆ ಆಮ್ಲಜನಕ ಕಡಿಮೆಯಾಗುತ್ತಿದೆ! 3 ನಿಮಿಷ ಕುಳಿತು ರಿಚಾರ್ಜ್ ಮಾಡಿ!',
  voice_walkStart: 'ನಡೆಯಲು ಪ್ರಾರಂಭಿಸಿ. ಹೆಜ್ಜೆಗಳನ್ನು ನೋಡಿ. ಹಿಮ್ಮಡಿಯನ್ನು ಮೃದುವಾಗಿ ಇರಿಸಿ!',
  voice_walkDone: 'ಚೆನ್ನಾಗಿ ಅಭ್ಯಾಸ ಮಾಡಿದ್ದೀರಿ! ಮೃದು ಮತ್ತು ಸಮತೋಲಿತ ಹೆಜ್ಜೆಗಳನ್ನು ಮುಂದುವರಿಸಿ.',
};

const te: Record<TranslationKey, string> = {
  ...en,
  welcomeTitle: 'ఫుట్ పవర్ మీటర్',
  chooseLanguage: 'మీ భాషను ఎంచుకోండి',
  continue: 'కొనసాగించు →',
  enterPhone: 'మొబైల్ నంబర్ నమోదు చేయండి',
  sendOtp: 'OTP పంపండి →',
  enterOtp: 'OTP నమోదు చేయండి',
  verifyContinue: 'ధృవీకరించండి →',
  patientDetails: 'రోగి వివరాలు',
  completeRegistration: 'నమోదు పూర్తి చేయండి ✓',
  goodMorning: 'శుభోదయం!',
  goodAfternoon: 'నమస్కారం!',
  goodEvening: 'శుభ సాయంత్రం!',
  footPowerMeter: 'ఫుట్-పవర్ మీటర్',
  speakStatus: '🔊 స్థితి చెప్పండి',
  refreshSensors: '🔄 సెన్సార్ రిఫ్రెష్',
  goldenBadge: 'గోల్డెన్ స్టెప్ బ్యాడ్జ్ అన్‌లాక్!',
  safe: 'సురక్షితం',
  warning: 'హెచ్చరిక',
  danger: 'ప్రమాదం',
  yourFeetStatus: 'మీ పాదాల స్థితి',
  noProfileYet: 'ఇంకా ప్రొఫైల్ లేదు',
  noProfileText: 'మీరు నమోదు చేయడాన్ని వదిలేశారు. ఆప్ మళ్లీ తెరుచుకున్నప్పుడు ప్రొఫైల్ సృష్టించండి, లేదా లాగ్ అవుట్ చేసి ఇప్పుడు నమోదు చేయండి.',
  logOutAndRegister: 'లాగ్ అవుట్ & రిజిస్టర్',
  logOutQuestion: 'లాగ్ అవుట్?',
  logOutWarning: 'ఆప్‌ను ఉపయోగించడానికి మీరు మళ్లీ నమోదు చేసుకోవాలి లేదా స్కిప్ చేయాలి.',
  cancel: 'రద్దు చేయి',
  logOut: 'లాగ్ అవుట్',
  personal: 'వ్యక్తిగత',
  medicalHistorySection: 'వైద్య చరిత్ర',
  emergencyContactSection: 'అత్యవసర సంబంధం',
  appSection: 'ఆప్',
  fullName: 'పూర్తి పేరు',
  age: 'వయస్సు',
  gender: 'లింగం',
  weight: 'బరువు',
  height: 'ఎత్తు',
  bloodType: 'రక్త వర్గం',
  diabetesType: 'మధుమేహం రకం',
  duration: 'వ్యవధి',
  name: 'పేరు',
  phone: 'ఫోన్',
  language: 'భాష',
  registeredMobile: 'నమోదు చేసిన మొబైల్',
  dataStoredNote: 'మీ డేటా ఈ పరికరంలో భద్రపరచబడి, అంగీకరించిన కుటుంబ సభ్యులతో మాత్రమే పంచుకోబడుతుంది.',
  user: 'వినియోగదారు',
  years: 'సంవత్సరాలు',
  kg: 'కేజీ',
  cm: 'సెం.మీ',
  voice_healthy: 'చాలా బాగుంది! మీ పాదాలు ఆరోగ్యంగా ఉన్నాయి. సమతుల్యంగా నడవండి.',
  voice_caution: 'జాగ్రత్త. దయచేసి కొంచెం విశ్రాంతి తీసుకోండి.',
  voice_critical: 'హెచ్చరిక! పాదాల ఆరోగ్యం క్షీణించింది. వెంటనే కూర్చోండి.',
  voice_healthy_detail: 'చాలా బాగుంది! మీ పాదాలు {percent}% ఆరోగ్యంగా ఉన్నాయి. సమతుల్యంగా నడవండి.',
  voice_caution_detail: 'జాగ్రత్త. మీ పాదాల ఆరోగ్యం {percent}% ఉంది. దయచేసి కొంచెం విశ్రాంతి తీసుకోండి.',
  voice_critical_detail: 'హెచ్చరిక! మీ పాదాల ఆరోగ్యం {percent}% ఉంది మరియు ఇది తీవ్రంగా ఉంది. వెంటనే కూర్చోండి.',
  voice_sitDown: 'బిడ్డా, దయచేసి ఒక నిమిషం కూర్చుని నీరు తాగండి. మీ ఎడమ మడమపై ఎక్కువ బరువు ఉంది.',
  voice_heelOxygen: 'మీ ఎడమ మడమకు ఆక్సిజన్ తగ్గుతోంది! 3 నిమిషాలు కూర్చుని రీచార్జ్ చేయండి!',
  voice_walkStart: 'నడవడం ప్రారంభించండి. అడుగులు చూడండి. మడమను మెల్లగా ఉంచండి!',
  voice_walkDone: 'చాలా బాగా అభ్యాసం చేశారు! మృదువైన, సమతుల్య అడుగులు కొనసాగించండి.',
};

const ta: Record<TranslationKey, string> = {
  ...en,
  welcomeTitle: 'ஃபுட் பவர் மீட்டர்',
  chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
  continue: 'தொடரவும் →',
  enterPhone: 'மொபைல் எண்ணை உள்ளிடவும்',
  sendOtp: 'OTP அனுப்பு →',
  enterOtp: 'OTP உள்ளிடவும்',
  verifyContinue: 'சரிபார்க்கவும் →',
  patientDetails: 'நோயாளி விவரங்கள்',
  completeRegistration: 'பதிவு முடிக்கவும் ✓',
  goodMorning: 'காலை வணக்கம்!',
  goodAfternoon: 'வணக்கம்!',
  goodEvening: 'மாலை வணக்கம்!',
  footPowerMeter: 'ஃபுட்-பவர் மீட்டர்',
  speakStatus: '🔊 நிலையைச் சொல்லுங்கள்',
  refreshSensors: '🔄 சென்சார் புதுப்பிக்க',
  goldenBadge: 'கோல்டன் ஸ்டெப் பேட்ஜ் அன்லாக்!',
  safe: 'பாதுகாப்பானது',
  warning: 'எச்சரிக்கை',
  danger: 'ஆபத்து',
  yourFeetStatus: 'உங்கள் பாத நிலை',
  noProfileYet: 'இன்னும் சுயவிவரம் இல்லை',
  noProfileText: 'நீங்கள் பதிவு செய்வதைத் தவிர்த்துவிட்டீர்கள். ஆப்பை மீண்டும் திறந்ததும் சுயவிவரத்தை உருவாக்கவும், அல்லது வெளியேறி இப்போது பதிவு செய்யவும்.',
  logOutAndRegister: 'லாக் அவுட் & பதிவு',
  logOutQuestion: 'லாக் அவுட்?',
  logOutWarning: 'ஆப் பயன்படுத்த மீண்டும் பதிவு செய்யவோ அல்லது தவிர்க்கவோ வேண்டும்.',
  cancel: 'ரத்துசெய்',
  logOut: 'லாக் அவுட்',
  personal: 'தனிப்பட்ட',
  medicalHistorySection: 'மருத்துவ வரலாறு',
  emergencyContactSection: 'அவசர தொடர்பு',
  appSection: 'ஆப்',
  fullName: 'முழுப் பெயர்',
  age: 'வயது',
  gender: 'பாலினம்',
  weight: 'எடை',
  height: 'உயரம்',
  bloodType: 'இரத்த வகை',
  diabetesType: 'சர்க்கரை வியாதி வகை',
  duration: 'காலம்',
  name: 'பெயர்',
  phone: 'தொலைபேசி',
  language: 'மொழி',
  registeredMobile: 'பதிவு செய்யப்பட்ட மொபைல்',
  dataStoredNote: 'உங்கள் தரவு இந்த சாதனத்தில் சேமிக்கப்பட்டு, ஒப்புதல் அளித்த குடும்ப உறுப்பினர்களுடன் மட்டும் பகிரப்படும்.',
  user: 'பயனர்',
  years: 'வருடங்கள்',
  kg: 'கிலோ',
  cm: 'செ.மீ',
  voice_healthy: 'அருமை! உங்கள் பாதங்கள் ஆரோக்கியமாக உள்ளன. சமநிலையுடன் நடக்கவும்.',
  voice_caution: 'எச்சரிக்கை. தயவுசெய்து சிறிது ஓய்வு எடுங்கள்.',
  voice_critical: 'எச்சரிக்கை! பாத ஆரோக்கியம் மோசமாக உள்ளது. உடனே உட்காருங்கள்.',
  voice_healthy_detail: 'மிக நன்று! உங்கள் பாதங்கள் {percent}% ஆரோக்கியமாக உள்ளன. சமநிலையாக நடக்கவும்.',
  voice_caution_detail: 'எச்சரிக்கை. உங்கள் பாதங்களின் ஆரோக்கியம் {percent}% உள்ளது. தயவுசெய்து சிறிது ஓய்வு எடுங்கள்.',
  voice_critical_detail: 'எச்சரிக்கை! உங்கள் பாதங்களின் ஆரோக்கியம் {percent}% உள்ளது மற்றும் இது கடுமையானது. உடனே உட்காருங்கள்.',
  voice_sitDown: 'குழந்தாய், தயவுசெய்து ஒரு நிமிடம் உட்கார்ந்து தண்ணீர் குடியுங்கள். உங்கள் இடது குதிகால் மீது அதிக எடை உள்ளது.',
  voice_heelOxygen: 'உங்கள் இடது குதிகாலுக்கு ஆக்ஸிஜன் குறைகிறது! 3 நிமிடம் உட்கார்ந்து ரீசார்ஜ் செய்யுங்கள்!',
  voice_walkStart: 'நடக்கத் தொடங்குங்கள். காலடிகளைப் பாருங்கள். குதிகாலை மெதுவாக வையுங்கள்!',
  voice_walkDone: 'நல்ல பயிற்சி! மென்மையான, சமநிலையான அடிகளைத் தொடருங்கள்.',
};

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en,
  hi,
  kn,
  te,
  ta,
  mr: { ...hi },
  bn: { ...hi },
  gu: { ...hi },
};

export const t = (
  key: TranslationKey,
  lang: LanguageCode = 'en',
  params?: Record<string, string | number>
): string => {
  let value = translations[lang]?.[key] ?? translations.en[key] ?? key;

  if (params) {
    Object.entries(params).forEach(([name, replacement]) => {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    });
  }

  return value;
};

export type { TranslationKey };