import CartItem from "../../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      const ownerPushToken = addedProduct.ownerPushToken;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          ownerPushToken,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          ownerPushToken,
          productPrice
        );
      }
      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + productPrice,
      };

    case REMOVE_FROM_CART:
      const currentCartItems = state.items;
      const selectedProduct = currentCartItems[action.productId];
      console.log("=>", selectedProduct);
      let updatedCartItems;
      if (selectedProduct.quantity > 1) {
        const updatedCartItem = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.pushToken,
          selectedProduct.sum - selectedProduct.productPrice
        );
        console.log("U", updatedCartItem);
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedProduct.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const totalSum = updatedItems[action.productId].sum;
      delete updatedItems[action.productId];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - totalSum,
      };
  }

  return state;
};
