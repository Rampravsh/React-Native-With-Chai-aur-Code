import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const userIdPage = () => {
  const { userId } = useLocalSearchParams();
  return (
    <View>
      <Text>userIdPage {userId}</Text>
    </View>
  );
};

export default userIdPage;

const styles = StyleSheet.create({});
