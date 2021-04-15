import { BASE_URL } from "../../constants/Url";
import Product from "../../models/Product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/products.json`);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const resData = await response.json();

      const productsList = [];
      for (const key in resData) {
        productsList.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: productsList,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addProduct = (title, imageUrl, price, description) => {
  return async (dispatch) => {
    // execute any async code, thanks to redux thunk

    const response = await fetch(`${BASE_URL}/products.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productDetails: {
        title,
        imageUrl,
        price,
        description,
      },
    });
  };
};

export const editProduct = (productId, title, imageUrl, description) => {
  return async (dispatch) => {
    const response = await fetch(`${BASE_URL}/products/${productId}.jon`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
      }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: EDIT_PRODUCT,
      productId,
      productDetails: {
        title,
        imageUrl,
        description,
      },
    });
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(`${BASE_URL}/products/${productId}.json`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};
