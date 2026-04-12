import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CalculatorScreen } from './src/components/CalculatorScreen';
import { colors } from './src/theme/colors';

export default function App() {
  const systemTheme = useColorScheme();
  const theme = systemTheme === 'dark' ? 'dark' : 'light';
  const currentColors = colors[theme];

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { backgroundColor: currentColors.background }]}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={currentColors.background} />
        <CalculatorScreen themeColors={currentColors} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
