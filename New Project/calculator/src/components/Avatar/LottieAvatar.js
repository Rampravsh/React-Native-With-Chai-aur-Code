import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, LayoutAnimation } from 'react-native';
import LottieView from 'lottie-react-native';

const ANIMATIONS = {
  idle: require('../../../assets/lottie/idle.json'),
  // Using idle.json everywhere as requested
  happy: require('../../../assets/lottie/idle.json'),
  confused: require('../../../assets/lottie/idle.json'),
};

export const LottieAvatar = ({ currentState, isThinking }) => {
  const animationRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Faster pulse when thinking, to animate the shadow glow radius
  useEffect(() => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    const duration = isThinking ? 600 : 2500;
    const toValue = isThinking ? 1.25 : 1.12;

    const pulsation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: toValue, duration: duration, useNativeDriver: false }), // false because shadowRadius can't use native driver
        Animated.timing(pulseAnim, { toValue: 1, duration: duration, useNativeDriver: false }),
      ])
    );
    pulsation.start();
    return () => pulsation.stop();
  }, [isThinking]);

  // Layout animation to smoothly transition text/shadow colors
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentState]);

  // Determine neon accent colors based on state
  let accentColor = '#0ff'; // Cyan (Idle)
  let currentLabel = currentState;
  
  if (isThinking) {
    accentColor = '#f97316'; // Neon Orange
    currentLabel = 'thinking';
  } else if (currentState === 'happy') {
    accentColor = '#10b981'; // Neon Green
  } else if (currentState === 'confused') {
    accentColor = '#ec4899'; // Neon Pink
  }

  // Dynamically interpolate the shadow's glowing radius
  const shadowGlow = pulseAnim.interpolate({
    inputRange: [1, 1.25],
    outputRange: [15, 35]
  });

  return (
    <View style={styles.container}>
      {/* We apply the glow purely as a shadow. Background circle is fully removed. */}
      <Animated.View style={[
        styles.avatarContainer,
        {
          shadowColor: accentColor,
          shadowRadius: shadowGlow,
        }
      ]}>
        <LottieView
          ref={animationRef}
          source={ANIMATIONS.idle} // Hardcoded to use idle animation always
          autoPlay
          loop
          style={styles.lottie}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    // Add base shadow properties for the neon glow
    shadowOffset: { width: 0, height: 15 }, // Pushes shadow toward the bottom
    shadowOpacity: 0.85,
    elevation: 8, // For Android drop shadow
  },
  lottie: {
    width: 260,
    height: 260,
  },
  statusText: {
    marginTop: 20,
    fontSize: 14,
    letterSpacing: 6,
    fontWeight: '800',
    opacity: 0.9,
  }
});
