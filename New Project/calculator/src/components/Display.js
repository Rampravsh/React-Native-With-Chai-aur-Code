import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Display = ({ currentValue, themeColors }) => {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.text, { color: themeColors.text }]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {currentValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    minHeight: 120,
  },
  text: {
    fontSize: 80,
    fontWeight: '300',
  },
});
