import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../../components/AppButton";
import AppChip from "../../components/AppChip";
import AppText from "../../components/AppText";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <AppButton
          onButtonClick={() => {
            dispatch(addToCart(selectedProduct));
          }}
        >
          Add
        </AppButton>
        <View style={styles.chip}>
          <AppChip>${selectedProduct.price.toFixed(2)}</AppChip>
        </View>
        <AppText style={styles.description}>
          {selectedProduct.description}
        </AppText>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  details: {
    alignItems: "center",
    marginTop: 10,
  },
  chip: {
    marginVertical: 10,
  },

  description: {
    textAlign: "center",
  },
});

export default ProductDetailScreen;
