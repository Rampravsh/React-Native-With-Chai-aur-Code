import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const productIdPage = () => {
  const { productId } = useLocalSearchParams();
  return (
    <View>
      <Text>productIdPage {productId} </Text>
    </View>
  );
};

export default productIdPage;

const styles = StyleSheet.create({});
