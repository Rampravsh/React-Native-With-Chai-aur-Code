import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const index = () => {
  return (
    <View style={styles.container}>
      <Text>index</Text>
      <Link style={styles.link} href={"/about"}>
        Go to about
      </Link>
      <Link style={styles.link} href={"/details"}>
        Go to details
      </Link>
      <Link style={styles.link} href={"/overview"}>
        Go to overview
      </Link>
      <Link style={styles.link} href={"/overview/user"}>
        Go to overview
      </Link>
      <Link style={styles.link} href={"/3435"}>
        Go to userId Page
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    backgroundColor: "red",
    color:"white",
    width: 200,
    height: 50,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
});
