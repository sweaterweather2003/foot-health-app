import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS } from '../utils/theme';
import GiantButton from '../components/GiantButton';
import * as Haptics from 'expo-haptics';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

interface Footprint {
  id: number;
  x: number;
  side: 'left' | 'right';
  good: boolean;
  anim: Animated.Value;
}

const LiveWalkerScreen: React.FC = () => {
  const { speak, tr } = useLanguage();
  const [isWalking, setIsWalking] = useState(false);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const [stepCount, setStepCount] = useState(0);
  const [goodSteps, setGoodSteps] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextId = useRef(0);

  const startWalking = () => {
    setIsWalking(true);
    setFootprints([]);
    setStepCount(0);
    setGoodSteps(0);
    speak('voice_walkStart');

    intervalRef.current = setInterval(() => {
      const side: Footprint['side'] = Math.random() > 0.5 ? 'left' : 'right';
      const good = Math.random() > 0.25;
      const x = 40 + Math.random() * (width - 120);

      const anim = new Animated.Value(0);
      const id = nextId.current++;

      setFootprints((prev) => {
        const next = [...prev, { id, x, side, good, anim }];
        return next.slice(-8);
      });

      setStepCount((c) => c + 1);
      if (good) {
        setGoodSteps((g) => g + 1);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }

      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0.7,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 700);
  };

  const stopWalking = () => {
    setIsWalking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const accuracy = stepCount > 0 ? Math.round((goodSteps / stepCount) * 100) : 0;
    speak(
      `You took ${stepCount} steps. ${accuracy} percent were soft and balanced. Great practice!`,
      true
    );
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{tr('liveWalkerCam')}</Text>
        <Text style={styles.subtitle}>{tr('walkSubtitle')}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{stepCount}</Text>
          <Text style={styles.statLabel}>{tr('steps')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: COLORS.neonGreen }]}>{goodSteps}</Text>
          <Text style={styles.statLabel}>{tr('good')}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: COLORS.neonYellow }]}>
            {stepCount > 0 ? Math.round((goodSteps / stepCount) * 100) : 0}%
          </Text>
          <Text style={styles.statLabel}>{tr('accuracy')}</Text>
        </View>
      </View>

      <View style={styles.pathArea}>
        <View style={styles.pathLine} />
        <Text style={styles.pathHint}>{tr('walkThisWay')}</Text>

        {footprints.map((fp) => (
          <Animated.View
            key={fp.id}
            style={[
              styles.footprint,
              {
                left: fp.x,
                backgroundColor: fp.good ? COLORS.neonGreen : COLORS.neonRed,
                opacity: fp.anim,
                transform: [
                  {
                    scale: fp.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.3, 1],
                    }),
                  },
                  { rotate: fp.side === 'left' ? '-12deg' : '12deg' },
                ],
              },
            ]}
          >
            <Text style={styles.fpEmoji}>🦶</Text>
          </Animated.View>
        ))}
      </View>

      <View style={styles.feedbackRow}>
        <View style={styles.feedbackItem}>
          <View style={[styles.fbDot, { backgroundColor: COLORS.neonGreen }]} />
          <Text style={styles.fbText}>{tr('softHeel')}</Text>
        </View>
        <View style={styles.feedbackItem}>
          <View style={[styles.fbDot, { backgroundColor: COLORS.neonRed }]} />
          <Text style={styles.fbText}>{tr('hardUneven')}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        {!isWalking ? (
          <GiantButton
            title={tr('startWalking')}
            onPress={startWalking}
            color={COLORS.neonGreen}
            textColor="#000"
          />
        ) : (
          <GiantButton
            title={tr('stopAnalyze')}
            onPress={stopWalking}
            color={COLORS.neonRed}
            textColor="#FFF"
          />
        )}
      </View>

      <Text style={styles.tip}>{tr('walkTip')}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.lightGray,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 16,
  },
  statBox: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    minWidth: 90,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  statNum: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
  },
  statLabel: {
    color: COLORS.lightGray,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  pathArea: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: COLORS.cardBg,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(0, 245, 255, 0.25)',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 280,
  },
  pathLine: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    height: 4,
    backgroundColor: 'rgba(0, 245, 255, 0.3)',
    borderRadius: 2,
  },
  pathHint: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    color: COLORS.neonBlue,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footprint: {
    position: 'absolute',
    top: '42%',
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  fpEmoji: {
    fontSize: 26,
  },
  feedbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginHorizontal: 12,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fbDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  fbText: {
    color: COLORS.lightGray,
    fontSize: 13,
    fontWeight: '600',
  },
  controls: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  tip: {
    color: COLORS.lightGray,
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
    lineHeight: 18,
    opacity: 0.8,
  },
});

export default LiveWalkerScreen;