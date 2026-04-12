import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4;

export const Button = ({ text, onPress, themeColors, type = 'num', playSound }) => {
  const isOperator = type === 'operator' || type === 'equal';
  const isAction = type === 'action';

  let bgColor = themeColors.buttonBackground;
  let textColor = themeColors.buttonText;

  if (isOperator) {
    bgColor = themeColors.operatorBackground;
    textColor = themeColors.operatorText;
  } else if (isAction) {
    bgColor = themeColors.actionBackground;
    textColor = themeColors.actionText;
  }

  const handlePress = () => {
    if (playSound) playSound();
    onPress(type, text);
  };

  const isZero = text === '0';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[
        styles.button,
        { backgroundColor: bgColor },
        isZero && styles.zeroButton,
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: Math.floor(buttonWidth - 20),
    height: Math.floor(buttonWidth - 20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20, // Rounded-rectangle
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  zeroButton: {
    width: Math.floor((buttonWidth * 2) - 20),
    alignItems: 'flex-start',
    paddingLeft: 30, // to align the 0 text like iOS
  },
  text: {
    fontSize: 32,
    fontWeight: '500',
  },
});
