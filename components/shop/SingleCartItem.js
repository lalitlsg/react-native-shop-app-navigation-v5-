import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import AppText from "../AppText";
import { removeFromCart } from "../../store/actions/cart";

const SingleCartItem = ({
  productId,
  productTitle,
  quantity,
  sum,
  deletable,
}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.cartItem}>
      <AppText>{quantity}</AppText>
      <AppText>{productTitle}</AppText>
      <AppText>
        {"\u20B9"}
        {sum.toFixed(2)}
      </AppText>
      {deletable && (
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(removeFromCart(productId));
          }}
        >
          <View style={styles.delete}>
            <MaterialIcons name="delete" size={24} color="black" />
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  delete: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SingleCartItem;
