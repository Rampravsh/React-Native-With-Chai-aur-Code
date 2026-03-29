import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const index = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.text}>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 24,
    color:"white"
  },
});
