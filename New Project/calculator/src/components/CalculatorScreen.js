import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Button } from './Button';
import { useAudioPlayer } from 'expo-audio';

export const CalculatorScreen = ({ themeColors }) => {
  const { currentValue, handleInput } = useCalculator();
  const player = useAudioPlayer('https://cdn.freesound.org/previews/256/256113_3263906-lq.mp3');

  const playSound = () => {
    if (player) {
      try {
        player.seekTo(0);
        player.play();
      } catch (e) {
        console.log('Failed to play sound', e);
      }
    }
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
      <Display currentValue={currentValue} themeColors={themeColors} />
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
