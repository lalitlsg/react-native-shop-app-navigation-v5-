import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../../constants/Colors";
import AppChip from "../AppChip";
import AppText from "../AppText";

const ProductItem = ({ imageUrl, title, price, children }) => {
  return (
    <View style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.productImage} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.details}>
        <AppText style={styles.title}>{title}</AppText>
        <AppChip>
          {"\u20B9"}
          {price.toFixed(2)}
        </AppChip>
      </View>
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    height: 200,
    margin: 10,
    backgroundColor: Colors.primary,
    elevation: 1,
    borderRadius: 10,
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  details: {
    height: "35%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 15,
  },
  productImage: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});

export default ProductItem;
