import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AppChip = ({ children }) => {
  return (
    <View style={styles.chipContainer}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: Colors.chipBackground,
    padding: 3,
    borderRadius: 10,
  },
});

export default AppChip;
