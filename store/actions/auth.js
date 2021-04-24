import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_URL, SIGNUP_URL } from "../../constants/Url";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;

export const setDidTryAL = () => {
  return {
    type: SET_DID_TRY_AL,
  };
};

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  };
};

export const login = (email, password) => {
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

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationTime = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    storeData(resData.idToken, resData.localId, expirationTime);
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

    if (!response.ok) {
      const errData = await response.json();
      let errorMessage = "Something went wrong";
      if (errData.error.message === "EMAIL_EXISTS") {
        errorMessage = "Email Already Exists, You Can Login.";
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.idToken,
        resData.localId,
        parseInt(resData.expiresIn) * 1000
      )
    );

    const expirationTime = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    storeData(resData.idToken, resData.localId, expirationTime);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const storeData = async (token, userId, expirationTime) => {
  try {
    await AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        userId: userId,
        expirationTime: expirationTime.toISOString(),
      })
    );
  } catch (error) {
    console.log(error);
  }
};
