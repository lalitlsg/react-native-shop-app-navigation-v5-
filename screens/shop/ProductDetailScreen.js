import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppButton from "../../components/AppButton";
import AppChip from "../../components/AppChip";
import AppText from "../../components/AppText";
import Colors from "../../constants/Colors";
import { addToCart } from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={{ uri: selectedProduct.imageUrl }}
            style={styles.image}
          />
          <View style={styles.details}>
            <View style={styles.chip}>
              <AppChip>${selectedProduct.price.toFixed(2)}</AppChip>
            </View>
            <AppText style={styles.description}>
              {selectedProduct.description}
            </AppText>
            <AppButton
              buttonStyle={styles.buttonStyle}
              onPress={() => {
                dispatch(addToCart(selectedProduct));
              }}
            >
              Add
            </AppButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    width: "100%",
    height: 700,
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
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
  buttonStyle: {
    marginTop: 30,
    width: 150,
    height: 50,
  },
});

export default ProductDetailScreen;
