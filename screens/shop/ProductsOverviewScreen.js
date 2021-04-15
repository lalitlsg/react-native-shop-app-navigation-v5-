import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cart";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import CardButton from "../../components/shop/CardButton";
import { fetchProducts } from "../../store/actions/product";
import Colors from "../../constants/Colors";
import AppText from "../../components/AppText";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const fetchProductHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    fetchProductHandler();
  }, [dispatch, fetchProductHandler]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.loader} />
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.loader}>
        <AppText>{error}</AppText>
        <TouchableNativeFeedback onPress={fetchProductHandler}>
          <View style={styles.refresh}>
            <MaterialIcons name="refresh" size={40} color="black" />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  refresh: {
    width: 50,
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
