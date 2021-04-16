import NewOrder from "../../models/NewOrder";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new NewOrder(
        action.orderItems.orderId,
        action.orderItems.cartItems,
        action.orderItems.totalAmount,
        action.orderItems.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};
