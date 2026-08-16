import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { LanguageProvider, useLanguage } from './src/context/LanguageContext';
import DashboardScreen from './src/screens/DashboardScreen';
import LiveWalkerScreen from './src/screens/LiveWalkerScreen';
import FamilyScreen from './src/screens/FamilyScreen';
import WelcomeScreen from './src/screens/onboarding/WelcomeScreen';
import LanguageScreen from './src/screens/onboarding/LanguageScreen';
import PhoneScreen from './src/screens/onboarding/PhoneScreen';
import OTPScreen from './src/screens/onboarding/OTPScreen';
import PatientInfoScreen from './src/screens/onboarding/PatientInfoScreen';
import { COLORS } from './src/utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const { tr } = useLanguage();

  return (
    <Tab.Navigator
      id="main-tabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBg,
          borderTopColor: 'rgba(0, 245, 255, 0.2)',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.neonGreen,
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'Live Walker') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'Family') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: tr('dashboardTab') }}
      />
      <Tab.Screen
        name="Live Walker"
        component={LiveWalkerScreen}
        options={{ tabBarLabel: tr('liveWalkerTab') }}
      />
      <Tab.Screen
        name="Family"
        component={FamilyScreen}
        options={{ tabBarLabel: tr('familyTab') }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      id="auth-stack"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="PatientInfo" component={PatientInfoScreen} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.neonGreen} />
      </View>
    );
  }

  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});