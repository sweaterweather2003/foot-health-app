import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import Svg, { Path, Circle, G, Ellipse } from 'react-native-svg';
import { COLORS, ZONE_COLORS } from '../utils/theme';
import { FootZone, ZoneId, ZoneStatus } from '../utils/types';

interface Props {
  leftZones: FootZone[];
  rightZones: FootZone[];
  size?: number;
  showLabels?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FootAvatar: React.FC<Props> = ({
  leftZones,
  rightZones,
  size = 280,
  showLabels = true,
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const hasDanger = [...leftZones, ...rightZones].some((z) => z.status === 'danger');
    const hasWarning = [...leftZones, ...rightZones].some((z) => z.status === 'warning');

    if (hasDanger || hasWarning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.25,
            duration: hasDanger ? 400 : 700,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: hasDanger ? 400 : 700,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [leftZones, rightZones]);

  const getZone = (zones: FootZone[], id: ZoneId): FootZone =>
    zones.find((z) => z.id === id) || {
      id,
      label: id,
      status: 'safe' as ZoneStatus,
      pressure: 0,
    };

  // Simple stylized foot paths (left and right)
  const leftFootPath =
    'M 70 40 C 50 30, 30 50, 25 80 C 20 110, 25 150, 35 180 C 40 200, 55 220, 80 230 C 100 235, 110 220, 115 200 C 120 170, 115 130, 110 100 C 105 70, 90 50, 70 40 Z';
  const rightFootPath =
    'M 210 40 C 230 30, 250 50, 255 80 C 260 110, 255 150, 245 180 C 240 200, 225 220, 200 230 C 180 235, 170 220, 165 200 C 160 170, 165 130, 170 100 C 175 70, 190 50, 210 40 Z';

  // Zone positions (approximate for the SVG viewBox 0 0 280 260)
  const leftPositions = {
    bigToe: { cx: 55, cy: 55 },
    innerBall: { cx: 70, cy: 100 },
    outerBall: { cx: 45, cy: 110 },
    heel: { cx: 75, cy: 190 },
  };

  const rightPositions = {
    bigToe: { cx: 225, cy: 55 },
    innerBall: { cx: 210, cy: 100 },
    outerBall: { cx: 235, cy: 110 },
    heel: { cx: 205, cy: 190 },
  };

  const renderZone = (
    zone: FootZone,
    pos: { cx: number; cy: number },
    key: string
  ) => {
    const color = ZONE_COLORS[zone.status];
    const radius = zone.status === 'danger' ? 18 : zone.status === 'warning' ? 15 : 12;

    return (
      <G key={key}>
        <AnimatedCircle
          cx={pos.cx}
          cy={pos.cy}
          r={radius}
          fill={color}
          opacity={0.85}
          // @ts-ignore
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        />
        <Circle
          cx={pos.cx}
          cy={pos.cy}
          r={radius + 4}
          stroke={color}
          strokeWidth={2}
          fill="none"
          opacity={0.5}
        />
      </G>
    );
  };

  return (
    <View style={[styles.container, { width: size, height: size * 0.95 }]}>
      <Svg width={size} height={size * 0.95} viewBox="0 0 280 260">
        {/* Left Foot Outline */}
        <Path
          d={leftFootPath}
          fill="#1A2332"
          stroke={COLORS.neonBlue}
          strokeWidth={3}
          opacity={0.9}
        />
        {/* Right Foot Outline */}
        <Path
          d={rightFootPath}
          fill="#1A2332"
          stroke={COLORS.neonBlue}
          strokeWidth={3}
          opacity={0.9}
        />

        {/* Zones */}
        {renderZone(getZone(leftZones, 'bigToe'), leftPositions.bigToe, 'l-bt')}
        {renderZone(getZone(leftZones, 'innerBall'), leftPositions.innerBall, 'l-ib')}
        {renderZone(getZone(leftZones, 'outerBall'), leftPositions.outerBall, 'l-ob')}
        {renderZone(getZone(leftZones, 'heel'), leftPositions.heel, 'l-h')}

        {renderZone(getZone(rightZones, 'bigToe'), rightPositions.bigToe, 'r-bt')}
        {renderZone(getZone(rightZones, 'innerBall'), rightPositions.innerBall, 'r-ib')}
        {renderZone(getZone(rightZones, 'outerBall'), rightPositions.outerBall, 'r-ob')}
        {renderZone(getZone(rightZones, 'heel'), rightPositions.heel, 'r-h')}
      </Svg>

      {showLabels && (
        <View style={styles.labelsRow}>
          <Text style={styles.sideLabel}>LEFT</Text>
          <Text style={styles.sideLabel}>RIGHT</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -10,
  },
  sideLabel: {
    color: COLORS.neonBlue,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
});

export default FootAvatar;