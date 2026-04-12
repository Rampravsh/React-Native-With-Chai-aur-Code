import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';
import { BlurView } from 'expo-blur';

export const ChatInput = ({ onSend, onOpenCalculator }) => {
  const [isListening, setIsListening] = useState(false);
  const [loadingText, setLoadingText] = useState('Dial numbers...');

  const handleVoiceHold = () => {
    Vibration.vibrate(50);
    setIsListening(true);
    setLoadingText('Listening...');
    
    setTimeout(() => {
      const recognizedSpeech = '50 plus 20';
      setLoadingText(recognizedSpeech);
      setIsListening(false);
      
      setTimeout(() => {
        onSend(recognizedSpeech);
        setLoadingText('Dial numbers...');
      }, 500); 
    }, 1500);
  };

  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      <TouchableOpacity 
        style={styles.inputStyleButton} 
        onPress={onOpenCalculator}
        activeOpacity={0.6}
      >
        <Text style={[styles.inputText, isListening && styles.listeningText]}>{loadingText}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.micButton} 
        onPressIn={handleVoiceHold}
      >
        <Text style={styles.micIcon}>🎤</Text>
      </TouchableOpacity>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  inputStyleButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
  },
  inputText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
  },
  listeningText: {
    color: '#0ff', // Emphasize when it's recording mock audio
  },
  micButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.3)',
  },
  micIcon: {
    fontSize: 20,
  }
});
