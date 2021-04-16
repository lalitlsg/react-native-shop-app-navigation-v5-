import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import AppText from "./AppText";

const AppButton = ({ buttonStyle, textStyle, onPress, children }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={{ ...styles.appButton, ...buttonStyle }}>
          <AppText style={{ ...styles.buttonText, ...textStyle }}>
            {children}
          </AppText>
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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default AppButton;
