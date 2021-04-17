import React, { useState, useEffect } from "react";
import {
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import CardButton from "../../components/shop/CardButton";
import { deleteProduct } from "../../store/actions/product";
import Colors from "../../constants/Colors";
import AppEmpty from "../../components/AppEmpty";

const UserProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are You Sure?", "Are you sure to delete this item.", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            await dispatch(deleteProduct(id));
          } catch (error) {
            console.log(error.message);
            setError(error.message);
          }
          setIsLoading(false);
        },
      },
    ]);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error Occurred", error, [{ text: "Ok" }]);
    }
  }, [error]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.loader} />
      </View>
    );
  }

  if (userProducts.length === 0) {
    return (
      <View style={styles.empty}>
        <AppEmpty image={require("../../assets/images/empty.png")}>
          No Products Found!
        </AppEmpty>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          imageUrl={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <CardButton
            borderRight={1}
            onButtonClick={() => {
              props.navigation.navigate("EditProduct", {
                productId: itemData.item.id,
                title: itemData.item.title,
              });
            }}
          >
            Edit
          </CardButton>
          <CardButton
            borderLeft={1}
            onButtonClick={() => deleteHandler(itemData.item.id)}
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="md-add"
          onPress={() => {
            navDate.navigation.navigate("EditProduct");
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
  empty: {
    flex: 1,
    backgroundColor: Colors.primary,
    margin: 10,
  },
});

export default UserProductScreen;
