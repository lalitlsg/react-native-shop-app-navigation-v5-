import { BASE_URL } from "../../constants/Url";
import Product from "../../models/Product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
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
            resData[key].ownerId,
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
        userProducts: productsList.filter(
          (products) => products.ownerId === userId
        ),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    // execute any async code, thanks to redux thunk
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(`${BASE_URL}/products.json?auth=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description,
        ownerId: userId,
      }),
    });

    const resData = await response.json();

    dispatch({
      type: ADD_PRODUCT,
      productDetails: {
        id: resData.name,
        title,
        imageUrl,
        price,
        description,
        ownerId: userId,
      },
    });
  };
};

export const editProduct = (productId, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    const response = await fetch(
      `${BASE_URL}/products/${productId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      }
    );

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
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `${BASE_URL}/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId,
    });
  };
};
