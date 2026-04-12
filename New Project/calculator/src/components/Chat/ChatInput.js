import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Vibration } from 'react-native';
import { BlurView } from 'expo-blur';

export const ChatInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceHold = () => {
    Vibration.vibrate(50);
    setIsListening(true);
    setText('Listening...');
    
    setTimeout(() => {
      const recognizedSpeech = '50 plus 20';
      setText(recognizedSpeech);
      setIsListening(false);
      // Automatically trigger calculation logic on voice finish
      setTimeout(() => {
        onSend(recognizedSpeech);
        setText('');
      }, 500); 
    }, 1500);
  };

  const handleSend = () => {
    if (text.trim() && !isListening) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me math..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity 
        style={styles.micButton} 
        onPressIn={handleVoiceHold}
      >
        <Text style={styles.micIcon}>🎤</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendIcon}>➤</Text>
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
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
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
  sendButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 0, 255, 0.15)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,0,255,0.3)',
  },
  micIcon: {
    fontSize: 20,
  },
  sendIcon: {
    fontSize: 20,
    color: '#eaddff',
  }
});
