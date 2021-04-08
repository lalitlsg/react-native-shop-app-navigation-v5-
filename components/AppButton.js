import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AppButton = ({ children }) => {
  return (
    <TouchableNativeFeedback>
      <View style={styles.appButton}>
        <Text>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  appButton: {},
});

export default AppButton;
