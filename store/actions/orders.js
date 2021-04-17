import { BASE_URL } from "../../constants/Url";
import NewOrder from "../../models/NewOrder";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(`${BASE_URL}/orders/${userId}.json`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    console.log(resData);
    const loadedOrders = [];

    for (const key in resData) {
      loadedOrders.push(
        new NewOrder(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          new Date(resData[key].date)
        )
      );
    }

    dispatch({
      type: SET_ORDERS,
      orders: loadedOrders,
    });
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();
    const response = await fetch(
      `${BASE_URL}/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = response.json();

    dispatch({
      type: ADD_ORDER,
      orderItems: {
        orderId: resData.name,
        cartItems,
        totalAmount,
        date: date,
      },
    });
  };
};
