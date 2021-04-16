import { BASE_URL } from "../../constants/Url";

export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date = new Date();

    const response = await fetch(`${BASE_URL}/orders/u1.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    });

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
