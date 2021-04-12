import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import AppText from "./AppText";

const AppButton = ({ onPress, children }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.appButton}>
          <AppText style={styles.buttonText}>{children}</AppText>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 3,
  },
  appButton: {
    backgroundColor: Colors.success,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default AppButton;
