import Colors from "@/constants/Colors";
import { FILTER_OPTIONS, FilterOptions } from "@/constants/tasks";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native";

type FileterTabsProps = {
  selected: FilterOptions;
  onSelect: (filter: FilterOptions) => void;
};

const FilterTabs = ({ selected, onSelect }: FileterTabsProps) => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

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
            style={[
              styles.tab,
              { backgroundColor: colors.surface, borderColor: colors.border },
              isSelected && { backgroundColor: colors.primary, borderColor: colors.primary },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.textSecondary },
                isSelected && { color: colors.textPrimary },
              ]}
            >
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontWeight: "500",
    fontSize: 14,
  },
});
