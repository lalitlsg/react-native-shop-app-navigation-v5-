import React, { useState, useEffect, useCallback } from "react";
import { View, TextInput, ScrollView, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import AppText from "../../components/AppText";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import Colors from "../../constants/Colors";
import { addProduct, editProduct } from "../../store/actions/product";

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const currentEditProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(
    currentEditProduct ? currentEditProduct.title : ""
  );
  const [imageUrl, setImageUrl] = useState(
    currentEditProduct ? currentEditProduct.imageUrl : ""
  );
  const [price, setPrice] = useState(
    currentEditProduct ? currentEditProduct.price : ""
  );
  const [description, setDescription] = useState(
    currentEditProduct ? currentEditProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (currentEditProduct) {
      dispatch(editProduct(productId, title, imageUrl, description));
    } else {
      dispatch(addProduct(title, imageUrl, +price, description));
    }
  }, [dispatch, productId, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <View style={styles.formControl}>
          <AppText>Title</AppText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <AppText>Image URL</AppText>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(imageUrl) => setImageUrl(imageUrl)}
          />
        </View>
        {!currentEditProduct && (
          <View style={styles.formControl}>
            <AppText>Price</AppText>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(price) => setPrice(price)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <AppText>Description</AppText>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(description) => setDescription(description)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submit = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Save" iconName="md-checkmark" onPress={submit} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  formContainer: {
    margin: 20,
  },
  formControl: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    fontSize: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default EditProductScreen;
