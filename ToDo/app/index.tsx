import DateSelector from "@/components/DateSelector";
import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { TASKS } from "@/constants/tasks";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const index = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <FlatList
        data={TASKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListHeaderComponent={
          <>
            {/* header */}
            <Header />
            {/* DateSelector */}
            <DateSelector />
            {/* FiltersTabs */}
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
