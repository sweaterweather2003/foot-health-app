import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../utils/theme';

interface Props {
  health: number; // 0-100
  size?: number;
  label?: string;
}

const HealthRing: React.FC<Props> = ({ health, size = 160, label = 'FOOT HEALTH' }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: health,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [health]);

  const getColor = () => {
    if (health >= 80) return COLORS.neonGreen;
    if (health >= 50) return COLORS.neonYellow;
    return COLORS.neonRed;
  };

  const color = getColor();

  // For animated stroke we approximate with a static progress for simplicity in Expo Go
  const progress = health / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="1" />
            <Stop offset="100%" stopColor={COLORS.neonBlue} stopOpacity="0.6" />
          </LinearGradient>
        </Defs>
        {/* Background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLORS.darkGray}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.centerContent}>
        <Text style={[styles.percent, { color }]}>{Math.round(health)}%</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 1,
  },
  label: {
    fontSize: 11,
    color: COLORS.lightGray,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 2,
  },
});

export default HealthRing;