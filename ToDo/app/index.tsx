import DateSelector from "@/components/DateSelector";
import FilterTabs from "@/components/FilterTabs";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";
import Colors from "@/constants/Colors";
import { FilterOptions, TASKS } from "@/constants/tasks";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {  FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const index = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOptions>("All");
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        ListHeaderComponent={
          <>
            {/* header */}
            <Header />
            {/* DateSelector */}
            <DateSelector />
            {/* FiltersTabs */}
            <FilterTabs selected={activeFilter} onSelect={setActiveFilter} />
          </>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Background,
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "white",
  },
  list: {
    paddingBottom: 2,
  },
});
