import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { LogBox } from "react-native";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducers/product";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";

import NavigationContainer from "./navigation/NavigationContainer";

LogBox.ignoreAllLogs();

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [dataLoaded] = useFonts({
    "open-sans-pro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
  if (!dataLoaded) {
    <AppLoading />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
      <StatusBar style="auto" />
    </Provider>
  );
}
