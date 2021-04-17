import { LOGIN_URL, SIGNUP_URL } from "../../constants/Url";
import { API_KEY } from "@env";

export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export const login = (email, password) => {
  console.log(API_KEY);
  console.log(LOGIN_URL);

  return async (dispatch) => {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      let errorMessage = "Something went wrong";
      if (errData.error.message === "EMAIL_NOT_FOUND") {
        errorMessage = "Email Not Found, Please Sign Up.";
      }
      if (errData.error.message === "INVALID_PASSWORD") {
        errorMessage = "Invalid Password.";
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: LOGIN,
    });
  };
};

export const signUp = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    // console.log(response);

    if (!response.ok) {
      const errData = await response.json();
      let errorMessage = "Something went wrong";
      if (errData.error.message === "EMAIL_EXISTS") {
        errorMessage = "Email Already Exists, You Can Login.";
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGN_UP,
    });
  };
};
