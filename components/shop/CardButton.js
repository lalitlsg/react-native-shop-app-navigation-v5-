import React from "react";
import { View, Text, TouchableNativeFeedback, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const CardButton = ({
  children,
  borderLeft = 0,
  borderRight = 0,
  onViewDetails,
}) => {
  return (
    <View
      style={{
        ...styles.cardButton,
        borderTopRightRadius: borderRight === 1 ? 10 : 0,
        borderBottomLeftRadius: borderRight === 1 ? 10 : 0,
        borderTopLeftRadius: borderLeft === 1 ? 10 : 0,
        borderBottomRightRadius: borderLeft === 1 ? 10 : 0,
      }}
    >
      <TouchableNativeFeedback onPress={onViewDetails}>
        <View style={styles.cardContainer}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.success,
  },
  cardButton: {
    overflow: "hidden",
  },
  buttonText: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default CardButton;
