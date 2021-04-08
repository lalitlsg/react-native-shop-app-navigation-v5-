import React from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const { title } = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

export default ProductDetailScreen;
