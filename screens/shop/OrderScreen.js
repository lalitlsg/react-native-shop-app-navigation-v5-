import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = () => {
  const orders = useSelector((state) => state.order.orders);

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

OrderScreen.navigationOptions = (navDate) => {
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

export default OrderScreen;
