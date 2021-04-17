import Product from "../../models/Product";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_PRODUCTS,
} from "../actions/product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts,
      };
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.productDetails.id,
        action.productDetails.ownerId,
        action.productDetails.title,
        action.productDetails.imageUrl,
        action.productDetails.description,
        action.productDetails.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case EDIT_PRODUCT:
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const editedProduct = new Product(
        action.productId,
        state.availableProducts[availableProductIndex].ownerId,
        action.productDetails.title,
        action.productDetails.imageUrl,
        action.productDetails.description,
        state.availableProducts[availableProductIndex].price
      );
      const currentAvailableProducts = [...state.availableProducts];
      currentAvailableProducts[availableProductIndex] = editedProduct;
      const userProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.productId
      );
      const currentUserProducts = [...state.userProducts];
      currentUserProducts[userProductIndex] = editedProduct;

      return {
        ...state,
        availableProducts: currentAvailableProducts,
        userProducts: currentUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
  }
  return state;
};
