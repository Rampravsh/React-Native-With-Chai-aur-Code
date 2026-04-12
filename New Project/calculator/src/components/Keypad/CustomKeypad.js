import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { BlurView } from 'expo-blur';

const BUTTONS = [
  ['C', '⌫', '%', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', 'SEND']
];

export const CustomKeypad = ({ onSend, onClose }) => {
  const [expression, setExpression] = useState('');

  const handlePress = (val) => {
    Vibration.vibrate(30);
    if (val === 'C') {
      setExpression('');
    } else if (val === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === 'SEND') {
      if (expression.trim() !== '') {
        onSend(expression.trim());
      }
    } else {
      setExpression(prev => prev + val);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Text style={styles.backText}>Close</Text>
         </TouchableOpacity>
         <BlurView intensity={20} tint="dark" style={styles.displayArea}>
            <Text style={styles.displayText} adjustsFontSizeToFit numberOfLines={2}>
              {expression || ' '}
            </Text>
         </BlurView>
      </View>
      
      <View style={styles.grid}>
        {BUTTONS.map((row, rIdx) => (
          <View key={rIdx} style={styles.row}>
            {row.map((btn) => {
              const isSend = btn === 'SEND';
              const isOp = ['/', '*', '-', '+', 'C', '⌫', '%'].includes(btn);
              return (
                <TouchableOpacity 
                  key={btn} 
                  style={[
                    styles.button, 
                    isOp && styles.opButton, 
                    isSend && styles.sendButton
                  ]} 
                  onPress={() => handlePress(btn)}
                >
                  <Text style={[
                      styles.btnText, 
                      isOp && styles.opText,
                      isSend && styles.sendText
                  ]}>
                    {btn}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  backText: {
    color: '#0ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  displayArea: {
    minHeight: 80,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  displayText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  grid: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  opButton: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  sendButton: {
    flex: 2.1,
    backgroundColor: 'rgba(255, 0, 255, 0.2)',
    borderColor: 'rgba(255, 0, 255, 0.5)',
  },
  btnText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 1,
  },
  opText: {
    color: '#0ff', 
  },
  sendText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 2.5,
  }
});
