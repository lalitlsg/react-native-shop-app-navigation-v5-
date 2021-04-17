import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import AppText from "./AppText";

const AppEmpty = ({ image, children }) => {
  return (
    <View style={styles.empty}>
      <Image source={image} style={styles.image} />
      <AppText style={styles.textStyles}>{children}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    height: "92%",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "50%",
  },
  textStyles: {
    textAlign: "center",
  },
});

export default AppEmpty;
