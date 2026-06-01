import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

const index = () => {
  return <Redirect href="/(root)/(tabs)" />;
};

export default index;

