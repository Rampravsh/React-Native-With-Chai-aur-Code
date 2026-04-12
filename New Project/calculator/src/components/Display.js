import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Display = ({ currentValue, previousValue, operator, themeColors }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* Render previous value and operator if available */}
        {previousValue !== null && operator !== null && (
          <Text style={[styles.previousText, { color: themeColors.actionBackground }]} numberOfLines={1}>
            {previousValue} {operator}
          </Text>
        )}
        <Text
          style={[styles.text, { color: themeColors.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {currentValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  previousText: {
    fontSize: 32,
    marginBottom: 10,
  },
  text: {
    fontSize: 80,
    fontWeight: '300',
  },
});
