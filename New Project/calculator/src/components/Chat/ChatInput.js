import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';
import { BlurView } from 'expo-blur';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

// Safely lazy-load the modern Expo Speech Recognition library
let SpeechRec = null;
try {
  SpeechRec = require('expo-speech-recognition').ExpoSpeechRecognitionModule;
} catch (e) {
  // Graceful fail in unsupported environments or standard Expo Go
}

export const ChatInput = ({ onSend, onOpenCalculator }) => {
  const [isListening, setIsListening] = useState(false);
  const [loadingText, setLoadingText] = useState('Dial numbers...');
  
  // Detect if the user is running inside the non-native Expo Go client
  const isExpoGo = Constants.appOwnership === 'expo' || Constants.executionEnvironment === 'storeClient';

  useEffect(() => {
    let subStart, subResult, subError;

    if (SpeechRec && !isExpoGo) {
      try {
        subStart = SpeechRec.addListener('start', () => {
          setLoadingText('Listening...');
        });
        
        subResult = SpeechRec.addListener('result', (e) => {
          if (e.results && e.results[0] && e.results[0].transcript) {
            setIsListening(false);
            const resultText = e.results[0].transcript;
            setLoadingText(resultText);
            setTimeout(() => {
              onSend(resultText);
              setLoadingText('Dial numbers...');
            }, 500);
          }
        });

        subError = SpeechRec.addListener('error', (e) => {
          setIsListening(false);
          setLoadingText('Mic Error');
          setTimeout(() => setLoadingText('Dial numbers...'), 1000);
        });
      } catch (err) {
         // Silently catch listener binding errors
      }
    }

    return () => {
      if (subStart) subStart.remove();
      if (subResult) subResult.remove();
      if (subError) subError.remove();
    };
  }, []);

  const handleVoiceHold = async () => {
    Vibration.vibrate(50);
    setIsListening(true);
    setLoadingText('Initializing Mic...');
    
    if (isExpoGo || !SpeechRec) {
      // EXPO GO SIMULATION FALLBACK
      setLoadingText('Listening (Simulation)...');
      setTimeout(() => {
        const recognizedSpeech = '50 plus 20';
        setLoadingText(recognizedSpeech);
        setIsListening(false);
        
        setTimeout(() => {
          onSend(recognizedSpeech);
          setLoadingText('Dial numbers...');
        }, 500); 
      }, 1500);
    } else {
      // REAL NATIVE MODULE - Starts physical microphone recording via EAS
      try {
        await SpeechRec.requestPermissionsAsync();
        await SpeechRec.start({ lang: 'en-US' });
      } catch (e) {
        setIsListening(false);
        setLoadingText('Native Setup Error');
        setTimeout(() => setLoadingText('Dial numbers...'), 1000);
      }
    }
  };

  const handleVoiceRelease = async () => {
      // Stop recording when user lifts their finger off the mic
      if (!isExpoGo && SpeechRec) {
         try {
           await SpeechRec.stop();
         } catch (e) {
           // Catch manual stop errors harmlessly
         }
      }
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
        onPressOut={handleVoiceRelease}
        activeOpacity={0.5}
      >
        <Ionicons name="mic-outline" size={26} color="#0ff" />
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
    color: '#0ff', // Vivid feedback color when active
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
