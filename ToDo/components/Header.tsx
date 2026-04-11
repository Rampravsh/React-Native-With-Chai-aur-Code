import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";

const Header = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
        <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Today's Task</Text>
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]}>
        <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
