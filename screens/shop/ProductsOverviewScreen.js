import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import CardButton from "../../components/shop/CardButton";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <CardButton
            borderRight={1}
            onButtonClick={() => {
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                title: itemData.item.title,
              });
            }}
          >
            Details
          </CardButton>
          <CardButton
            borderLeft={1}
            onButtonClick={() => {
              dispatch(addToCart(itemData.item));
            }}
          >
            Add
          </CardButton>
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navDate) => {
  return {
    headerTitle: "All Products",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navDate.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
