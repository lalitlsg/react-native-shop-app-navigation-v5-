import React, { useState } from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Feather } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import AppText from "../AppText";
import SingleCartItem from "./SingleCartItem";

const OrderItem = ({ totalAmount, orderDate, orderItems }) => {
  const [showOrderItems, setShowOrderItems] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <View style={styles.orderItem}>
        <AppText>
          {"\u20B9"}
          {totalAmount}
        </AppText>
        <AppText>{orderDate}</AppText>
        <TouchableNativeFeedback
          onPress={() => setShowOrderItems((prevState) => !prevState)}
        >
          <View style={styles.downArrow}>
            <Feather
              name={showOrderItems ? "chevron-up" : "chevron-down"}
              size={24}
              color="black"
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {showOrderItems && (
        <View>
          {orderItems.map((item) => (
            <SingleCartItem
              key={item.productId}
              productTitle={item.productTitle}
              quantity={item.quantity}
              sum={item.sum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.primary,
    padding: 15,
    margin: 15,
    elevation: 2,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  downArrow: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderItem;
