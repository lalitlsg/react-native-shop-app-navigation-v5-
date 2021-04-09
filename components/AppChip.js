import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AppChip = ({ children }) => {
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.chipText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: Colors.chipBackground,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1a1aff",
  },
  chipText: {
    fontWeight: "bold",
  },
});

export default AppChip;
