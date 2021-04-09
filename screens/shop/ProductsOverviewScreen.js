import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          itemData={itemData}
          onViewDetails={() => {
            props.navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              title: itemData.item.title,
            });
          }}
          onAddToCart={() => {
            dispatch(addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverviewScreen;
