import React, { useEffect, useCallback, useReducer } from "react";
import { View, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import AppText from "../../components/AppText";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import Colors from "../../constants/Colors";
import { addProduct, editProduct } from "../../store/actions/product";

const FORM_UPDATE = "UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const currentEditProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  // form state management
  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: currentEditProduct ? currentEditProduct.title : "",
      imageUrl: currentEditProduct ? currentEditProduct.imageUrl : "",
      price: "",
      description: currentEditProduct ? currentEditProduct.description : "",
    },
    inputValidities: {
      title: currentEditProduct ? true : false,
      imageUrl: currentEditProduct ? true : false,
      price: currentEditProduct ? true : false,
      description: currentEditProduct ? true : false,
    },
    formIsValid: currentEditProduct ? true : false,
  });

  const inputHandler = (inputId, text) => {
    let isValid = true;
    if (text.trim().length === 0) {
      isValid = false;
    }

    formDispatch({
      type: FORM_UPDATE,
      value: text,
      isValid: isValid,
      input: inputId,
    });
  };

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check the form errors", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }
    if (currentEditProduct) {
      dispatch(
        editProduct(
          productId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        addProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, productId, formState]);

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
            value={formState.inputValues.title}
            onChangeText={(text) => inputHandler("title", text)}
          />
          {!formState.inputValidities.title && (
            <AppText style={styles.errorMessage}>
              Title should not be empty
            </AppText>
          )}
        </View>
        <View style={styles.formControl}>
          <AppText>Image URL</AppText>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => inputHandler("imageUrl", text)}
          />
          {!formState.inputValidities.imageUrl && (
            <AppText style={styles.errorMessage}>
              ImageUrl should not be empty
            </AppText>
          )}
        </View>
        {!currentEditProduct && (
          <View style={styles.formControl}>
            <AppText>Price</AppText>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              keyboardType="number-pad"
              onChangeText={(text) => inputHandler("price", text)}
            />
            {!formState.inputValidities.price && (
              <AppText style={styles.errorMessage}>
                Price should not be empty
              </AppText>
            )}
          </View>
        )}
        <View style={styles.formControl}>
          <AppText>Description</AppText>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChangeText={(text) => inputHandler("description", text)}
          />
          {!formState.inputValidities.description && (
            <AppText style={styles.errorMessage}>
              Description should not be empty
            </AppText>
          )}
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
  errorMessage: {
    color: Colors.errorMessages,
  },
});

export default EditProductScreen;
