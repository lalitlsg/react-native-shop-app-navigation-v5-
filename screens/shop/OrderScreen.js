import React, { useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import { fetchOrders } from "../../store/actions/orders";
import AppEmpty from "../../components/AppEmpty";
import Colors from "../../constants/Colors";

const OrderScreen = () => {
  const orders = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <View style={styles.empty}>
        <AppEmpty image={require("../../assets/images/empty.png")}>
          No Orders Found!
        </AppEmpty>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          orderDate={itemData.item.readableDate}
          orderItems={itemData.item.orderItems}
        />
      )}
    />
  );
};

export const ordersScreenOptions = (navDate) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => {
            navDate.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    backgroundColor: Colors.primary,
    margin: 10,
  },
});

export default OrderScreen;
