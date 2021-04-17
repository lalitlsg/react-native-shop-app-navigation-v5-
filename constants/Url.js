import { API_KEY } from "@env";

export const BASE_URL =
  "https://react-native-shop-app-cea1b-default-rtdb.firebaseio.com";
export const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

export const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
