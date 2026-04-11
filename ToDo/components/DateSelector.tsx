import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";

type DateItem = {
  month: string;
  day: number;
  weekday: string;
  key: string;
};

const generateDates = (): DateItem[] => {
  const base = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(base);
    date.setDate(base.getDate() + (i - 3)); // Show 3 days before and 3 days after today
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      key: date.toISOString(),
    };
  });
};

const DATES = generateDates();
const DEFAULT_SELECTED = DATES[3].key; // Default to today (middle of the array)

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState(DEFAULT_SELECTED);
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {DATES.map((item) => {
        const isSelected = item.key === selectedDate;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.dateItem, isSelected && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedDate(item.key)}
          >
            <Text style={[styles.month, { color: colors.textSecondary }, isSelected && { color: colors.textPrimary }]}>
              {item.month}
            </Text>
            <Text style={[styles.day, { color: colors.textPrimary }, isSelected && { color: colors.textPrimary }]}>
              {item.day}
            </Text>
            <Text style={[styles.weekday, { color: colors.textSecondary }, isSelected && { color: colors.textPrimary }]}>
              {item.weekday}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 64,
  },
  month: {
    fontSize: 12,
    marginBottom: 6,
  },
  day: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  weekday: {
    fontSize: 12,
  },
});
