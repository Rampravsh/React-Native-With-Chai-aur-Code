import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Animated, LayoutAnimation } from 'react-native';
import LottieView from 'lottie-react-native';

const ANIMATIONS = {
  idle: 'https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/PinJump.json',
  happy: 'https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/Watermelon.json',
  confused: 'https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/LottieLogo1.json',
};

export const LottieAvatar = ({ currentState, isThinking }) => {
  const animationRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const lottieOpacity = useRef(new Animated.Value(1)).current;

  // Faster pulse when thinking, smooth infinite glow
  useEffect(() => {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    const duration = isThinking ? 600 : 2500;
    const toValue = isThinking ? 1.25 : 1.12;

    const pulsation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: toValue, duration: duration, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: duration, useNativeDriver: true }),
      ])
    );
    pulsation.start();
    return () => pulsation.stop();
  }, [isThinking]);

  // Smooth fade transition when swapping states
  useEffect(() => {
    Animated.sequence([
      Animated.timing(lottieOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(lottieOpacity, { toValue: 1, duration: 300, useNativeDriver: true })
    ]).start();

    if (animationRef.current) {
      setTimeout(() => {
        animationRef.current?.play();
      }, 150);
    }
    
    // Layout animation to smoothly transition colors/borders
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentState]);

  let accentColor = '#0ff'; // Cyan
  let currentLabel = currentState;
  
  if (isThinking) {
    accentColor = '#f97316'; // Neon Orange
    currentLabel = 'thinking';
  } else if (currentState === 'happy') {
    accentColor = '#10b981'; // Neon Green
  } else if (currentState === 'confused') {
    accentColor = '#ec4899'; // Neon Pink
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { textShadowColor: accentColor }]}>Khatarnak AI</Text>
      
      {/* Floating Animated Aura */}
      <Animated.View style={[
        styles.glowRing, 
        { transform: [{ scale: pulseAnim }], backgroundColor: accentColor }
      ]} />

      <View style={[styles.avatarContainer, { borderColor: accentColor }]}>
        <Animated.View style={{ opacity: lottieOpacity }}>
          <LottieView
            ref={animationRef}
            source={{ uri: ANIMATIONS[currentState] || ANIMATIONS.idle }}
            autoPlay
            loop
            style={styles.lottie}
          />
        </Animated.View>
      </View>
      <Text style={[styles.statusText, { color: accentColor }]}>{currentLabel.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 50,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  glowRing: {
    position: 'absolute',
    width: 270,
    height: 270,
    borderRadius: 135,
    zIndex: 0,
    opacity: 0.15,
  },
  avatarContainer: {
    width: 260,
    height: 260,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 130,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  lottie: {
    width: 280,
    height: 280,
  },
  statusText: {
    marginTop: 40,
    fontSize: 16,
    letterSpacing: 6,
    fontWeight: '800',
    opacity: 0.9,
  }
});
