import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import AppInput from "../../components/AppInput";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      formDispatch({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [formDispatch]
  );
  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input", "Please check the form errors", [
        { text: "Ok", style: "default" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (currentEditProduct) {
        await dispatch(
          editProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          addProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            formState.inputValues.description
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred", error, [{ text: "Ok" }]);
    }
  }, [error]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.loader} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <AppInput
          id="title"
          title="Title"
          errorText="Title should not be empty"
          onInputChange={inputChangeHandler}
          initialValue={currentEditProduct ? currentEditProduct.title : ""}
          initiallyValid={!!currentEditProduct}
          required
        />
        <AppInput
          id="imageUrl"
          title="ImageUrl"
          errorText="ImageUrl should not be empty"
          onInputChange={inputChangeHandler}
          initialValue={currentEditProduct ? currentEditProduct.imageUrl : ""}
          initiallyValid={!!currentEditProduct}
          required
        />
        {!currentEditProduct && (
          <AppInput
            id="price"
            title="Price"
            errorText="Price should not be empty"
            onInputChange={inputChangeHandler}
            keyboardType="decimal-pad"
            required
            min={0.1}
          />
        )}
        <AppInput
          id="description"
          title="Description"
          errorText="Description should not be empty"
          onInputChange={inputChangeHandler}
          multiline
          numberOfLines={3}
          initialValue={
            currentEditProduct ? currentEditProduct.description : ""
          }
          initiallyValid={!!currentEditProduct}
          required
          minLength={5}
        />
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
