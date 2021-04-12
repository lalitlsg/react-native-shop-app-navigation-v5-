import NewOrder from "../../models/NewOrder";
import { ADD_ORDER } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new NewOrder(
        new Date().toString(),
        action.orderItems.cartItems,
        action.orderItems.totalAmount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
