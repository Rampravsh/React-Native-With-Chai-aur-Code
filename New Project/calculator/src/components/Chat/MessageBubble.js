import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { BlurView } from 'expo-blur';

export const MessageBubble = ({ text, isAI }) => {
  const slideAnimX = useRef(new Animated.Value(isAI ? -40 : 40)).current; 
  const slideAnimY = useRef(new Animated.Value(20)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnimX, {
        toValue: 0,
        bounciness: 8,
        speed: 12,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnimY, {
        toValue: 0,
        bounciness: 8,
        speed: 12,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
        styles.wrapper, 
        isAI ? styles.aiWrapper : styles.userWrapper,
        { opacity: fadeAnim, transform: [{ translateX: slideAnimX }, { translateY: slideAnimY }] }
      ]}>
      <BlurView intensity={40} tint="dark" style={[styles.blurContainer, isAI ? styles.aiTint : styles.userTint]}>
        <Text style={styles.text}>{text}</Text>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '85%',
    marginVertical: 8,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  aiWrapper: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 6,
  },
  userWrapper: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 6,
  },
  blurContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  aiTint: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)', // Neon pink tint
  },
  userTint: {
    backgroundColor: 'rgba(14, 165, 233, 0.15)', // Cyan tint
  },
  text: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.3,
  }
});
