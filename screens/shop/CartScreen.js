import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import SingleCartItem from "../../components/shop/SingleCartItem";
import Colors from "../../constants/Colors";
import { addOrder } from "../../store/actions/orders";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const currentCartItems = state.cart.items;
    const cartItemsArray = [];
    for (let key in currentCartItems) {
      cartItemsArray.push({
        productId: key,
        productPrice: currentCartItems[key].productPrice,
        productTitle: currentCartItems[key].productTitle,
        quantity: currentCartItems[key].quantity,
        sum: currentCartItems[key].sum,
      });
    }
    return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });
  return (
    <View style={styles.screen}>
      <View style={styles.total}>
        <View style={styles.text}>
          <AppText>Total: </AppText>
          <AppText>${totalAmount.toFixed(2)}</AppText>
        </View>
        <AppButton
          onPress={() => {
            dispatch(addOrder(cartItems, totalAmount));
          }}
        >
          Order Now
        </AppButton>
      </View>
      <View style={styles.cartList}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={(itemData) => <SingleCartItem itemData={itemData} />}
          />
        ) : (
          <AppText style={styles.cartEmpty}>Cart is empty!</AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 15,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    elevation: 2,
  },
  text: {
    flexDirection: "row",
  },
  cartList: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 15,
    elevation: 2,
  },
  cartEmpty: {
    textAlign: "center",
  },
});

export default CartScreen;
