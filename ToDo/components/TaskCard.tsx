import Colors from "@/constants/Colors";
import { Task } from "@/constants/tasks";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const STATUS_COLOR = {
    Done: colors.statusDone,
    "In Progress": colors.statusInProgress,
    Todo: colors.statusTodo,
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.content}>
        <Text style={[styles.category, { color: colors.textPrimary }]}>{task.category}</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{task.title}</Text>
        <View style={styles.footer}>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color={colors.primary} />
            <Text style={[styles.time, { color: colors.primary }]}>{task.time}</Text>
          </View>
          <Text style={[styles.status, { color: STATUS_COLOR[task.status] }]}>
            {task.status}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.iconBadge,
          { backgroundColor: task.icon.backgroundColor },
        ]}
      >
        <Ionicons name={task.icon.name as any} size={18} color={"#fff"} />
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  time: {
    fontSize: 12,
    fontWeight: "500",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
  },
});
