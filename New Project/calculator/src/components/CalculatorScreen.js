import React from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Button } from './Button';

export const CalculatorScreen = ({ themeColors }) => {
  const { currentValue, previousValue, operator, handleInput } = useCalculator();

  const playSound = () => {
    Vibration.vibrate(40); // Soft vibration for tap feedback
  };

  const renderRow = (buttons) => (
    <View style={styles.row}>
      {buttons.map((btn) => (
        <Button
          key={btn.text}
          text={btn.text}
          type={btn.type}
          onPress={handleInput}
          themeColors={themeColors}
          playSound={playSound}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Display 
        currentValue={currentValue}
        previousValue={previousValue} 
        operator={operator} 
        themeColors={themeColors}
      />
      <View style={styles.keypad}>
        {renderRow([
          { text: 'AC', type: 'action' },
          { text: '+/-', type: 'action' },
          { text: '%', type: 'action' },
          { text: '/', type: 'operator' },
        ])}
        {renderRow([
          { text: '7', type: 'num' },
          { text: '8', type: 'num' },
          { text: '9', type: 'num' },
          { text: '*', type: 'operator' },
        ])}
        {renderRow([
          { text: '4', type: 'num' },
          { text: '5', type: 'num' },
          { text: '6', type: 'num' },
          { text: '-', type: 'operator' },
        ])}
        {renderRow([
          { text: '1', type: 'num' },
          { text: '2', type: 'num' },
          { text: '3', type: 'num' },
          { text: '+', type: 'operator' },
        ])}
        {renderRow([
          { text: '0', type: 'num' },
          { text: '.', type: 'action' },
          { text: '⌫', type: 'action' },
          { text: '=', type: 'equal' },
        ])}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keypad: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
