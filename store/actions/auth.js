import { SIGNUP_URL } from "../../constants/Url";

export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
    });
  };
};

export const signUp = (email, password) => {
  console.log(email, password);
  return async (dispatch) => {
    const response = await fetch(`${SIGNUP_URL}`, {
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
      console.log(response);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGN_UP,
    });
  };
};
