import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeDashboard = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();
  
  const [fact, setFact] = useState<string>("");
  const [loadingFact, setLoadingFact] = useState(true);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch(`https://uselessfacts.jsph.pl/api/v2/facts/today`);
        const data = await res.json();
        setFact(data.text);
      } catch (e) {
        setFact("Today is a great day to be productive and get things done!");
      } finally {
        setLoadingFact(false);
      }
    };
    fetchFact();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.Background, paddingTop: insets.top }]}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.textSecondary }]}>Hello there,</Text>
        <Text style={[styles.name, { color: colors.textPrimary }]}>Welcome Back! 👋</Text>
      </View>

      <View style={[styles.factCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.factHeader}>
          <Ionicons name="bulb" size={20} color={colors.primary} />
          <Text style={[styles.factTitle, { color: colors.textPrimary }]}>Fact of the Day</Text>
        </View>
        {loadingFact ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 10 }} />
        ) : (
          <Text style={[styles.factText, { color: colors.textSecondary }]}>{fact}</Text>
        )}
      </View>
    </View>
  );
};

export default HomeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
  },
  factCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  factHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  factTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  factText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
