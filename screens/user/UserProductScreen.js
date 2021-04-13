import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import CardButton from "../../components/shop/CardButton";
import { deleteProduct } from "../../store/actions/product";

const UserProductScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemDate) => (
        <ProductItem itemData={itemDate}>
          <CardButton
            borderRight={1}
            onButtonClick={() => {
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                title: itemData.item.title,
              });
            }}
          >
            Edit
          </CardButton>
          <CardButton
            borderLeft={1}
            onButtonClick={() => {
              dispatch(deleteProduct(itemDate.item.id));
            }}
          >
            Delete
          </CardButton>
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navDate) => {
  return {
    headerTitle: "Your Products",
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

export default UserProductScreen;
