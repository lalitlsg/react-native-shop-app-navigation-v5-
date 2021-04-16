import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppText = ({ children, style }) => {
  return (
    <View>
      <Text style={{ ...styles.text, ...style }}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-pro",
    fontSize: 17,
    color: "#000",
  },
});

export default AppText;
