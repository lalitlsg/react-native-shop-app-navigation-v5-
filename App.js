import { StatusBar } from "expo-status-bar";
import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import productReducer from "./store/reducers/product";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/orders";

import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

const store = createStore(rootReducer);

export default function App() {
  const [dataLoaded] = useFonts({
    "open-sans-pro": require("./assets/fonts/SourceSansPro-Regular.ttf"),
  });
  if (!dataLoaded) {
    <AppLoading />;
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}
