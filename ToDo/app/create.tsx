import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateTodo = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();
  const isDark = theme === "dark";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    // Basic placeholder action
    alert(`Task created: ${title}`);
    setTitle("");
    setTime("");
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.Background, paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Decorative Orbs for Glassmorphism Effect */}
      <View style={[styles.orb, { top: -50, right: -50, width: 250, height: 250, backgroundColor: colors.primary }]} />
      <View style={[styles.orb, { bottom: "20%", left: -50, width: 180, height: 180, backgroundColor: colors.statusTodo }]} />
      <View style={[styles.orb, { bottom: "40%", right: -20, width: 120, height: 120, backgroundColor: colors.statusDone }]} />

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Create New Task</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={[styles.label, { color: colors.textSecondary }]}>Task Title</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)', color: colors.textPrimary, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}
          placeholder="e.g., Code Review..."
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)', color: colors.textPrimary, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}
          placeholder="e.g., Work, Personal, etc."
          placeholderTextColor={colors.textSecondary}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Time</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)', color: colors.textPrimary, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}
          placeholder="e.g., 10:00 AM"
          placeholderTextColor={colors.textSecondary}
          value={time}
          onChangeText={setTime}
        />

        <TouchableOpacity 
          onPress={handleSubmit} 
          activeOpacity={0.8} 
          style={[styles.submitButton, {
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.4)',
            borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.8)',
          }]}
        >
          <Text style={[styles.submitText, { color: isDark ? "#fff" : colors.primary }]}>Create Task</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 32,
    borderRadius: 16,
    overflow: "hidden",
  },
  submitButton: {
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "700",
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.15,
  },
});
