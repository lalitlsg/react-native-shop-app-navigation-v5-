import CartItem from "../../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/orders";

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

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
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
      let updatedCartItems;
      if (selectedProduct.quantity > 1) {
        const updatedCartItem = new CartItem(
          selectedProduct.quantity - 1,
          selectedProduct.productPrice,
          selectedProduct.productTitle,
          selectedProduct.sum - selectedProduct.productPrice
        );
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
  }

  return state;
};
