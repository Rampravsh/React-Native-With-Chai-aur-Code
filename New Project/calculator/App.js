import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, LayoutAnimation, Platform, UIManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { LottieAvatar } from './src/components/Avatar/LottieAvatar';
import { ChatInterface } from './src/components/Chat/ChatInterface';
import { parseMathQuery } from './src/utils/mathParser';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! Ask me to calculate something or hold the mic button.', isAI: true }
  ]);
  const [avatarState, setAvatarState] = useState('idle');
  const [isThinking, setIsThinking] = useState(false);

  const addMessage = (text, isAI) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), text, isAI }]);
  };

  const handleSend = (userText) => {
    addMessage(userText, false);
    setIsThinking(true);
    setAvatarState('idle'); // Ensure we are neutral before calculating
    
    // Simulating "thinking" time for realism and better UX responsiveness
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
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient 
          colors={['#0f172a', '#1e1b4b', '#000000']} 
          style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
        >
          <LottieAvatar currentState={avatarState} isThinking={isThinking} />
          <ChatInterface messages={messages} onSend={handleSend} isThinking={isThinking} />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a', 
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
