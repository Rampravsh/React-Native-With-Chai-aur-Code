import Colors from "@/constants/Colors";
import { FILTER_OPTIONS, FilterOptions } from "@/constants/tasks";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type FileterTabsProps = {
  selected: FilterOptions;
  onSelect: (filter: FilterOptions) => void;
};

const FilterTabs = ({ selected, onSelect }: FileterTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTER_OPTIONS.map((item) => {
        const isSelected = item === selected;
        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            style={[styles.tab, isSelected && styles.tabSelected]}
          >
            <Text style={[styles.tab, isSelected && styles.tabSelected]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    color: "#374151",
    fontWeight: "500",
    fontSize: 14,
  },
  tabSelected: {
    backgroundColor: Colors.primary,
    color: "#ffffff",
  },
});
