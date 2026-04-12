import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, LayoutAnimation, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { LottieAvatar } from './src/components/Avatar/LottieAvatar';
import { ChatInterface } from './src/components/Chat/ChatInterface';
import { CustomKeypad } from './src/components/Keypad/CustomKeypad';
import { parseMathQuery } from './src/utils/mathParser';

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! Ask me to calculate something or hold the mic button.', isAI: true }
  ]);
  const [avatarState, setAvatarState] = useState('idle');
  const [isThinking, setIsThinking] = useState(false);
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);

  const addMessage = (text, isAI) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isAI }]);
  };

  const handleSend = (userText) => {
    setIsKeypadOpen(false); // Automatically transition out of keypad on send
    addMessage(userText, false);
    setIsThinking(true);
    setAvatarState('idle');  
    
    setTimeout(() => {
      const calculation = parseMathQuery(userText);
      const responseText = calculation.success ? calculation.resultText : calculation.error;
      const newState = calculation.success ? 'happy' : 'confused';
      
      setIsThinking(false);
      setAvatarState(newState);
      addMessage(responseText, true);
      
      Speech.speak(responseText, {
        rate: 1.05,
        pitch: 1.1,
        onDone: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setAvatarState('idle');
        },
        onStopped: () => setAvatarState('idle'),
        onError: () => setAvatarState('idle'),
      });
    }, 1200);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" />
        <LinearGradient 
          colors={['#0f172a', '#1e1b4b', '#000000']} 
          style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.layoutFlex}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.avatarSection}>
                  <LottieAvatar currentState={avatarState} isThinking={isThinking} />
                </View>
              </TouchableWithoutFeedback>
              
              <View style={styles.chatSection}>
                {isKeypadOpen ? (
                  <CustomKeypad 
                    onSend={handleSend} 
                    onClose={() => setIsKeypadOpen(false)} 
                  />
                ) : (
                  <ChatInterface 
                    messages={messages} 
                    onSend={handleSend} 
                    isThinking={isThinking} 
                    onOpenCalculator={() => setIsKeypadOpen(true)}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', 
  },
  container: {
    flex: 1,
  },
  layoutFlex: {
    flex: 1,
    flexDirection: 'column', // Reverts from horizontal side-by-side to vertical Top/Bottom
  },
  avatarSection: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatSection: {
    flex: 2,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  }
});
