import TaskCard from "@/components/TaskCard";
import Colors from "@/constants/Colors";
import { TASKS } from "@/constants/tasks";
import React from "react";
import { FlatList, StyleSheet, Text, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ManageTodo = () => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.Background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Manage Todos</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          All your scheduled tasks
        </Text>
      </View>
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ManageTodo;

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
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  list: {
    paddingBottom: 20,
  },
});
