import React from "react";
import { FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import CardButton from "../../components/shop/CardButton";
import { deleteProduct } from "../../store/actions/product";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are You Sure?", "Are you sure to delete this item.", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };

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

export default UserProductScreen;
