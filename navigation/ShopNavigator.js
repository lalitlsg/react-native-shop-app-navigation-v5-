import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import ProductsOverviewScreen, {
  productOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen, { ordersScreenOptions } from "../screens/shop/OrderScreen";
import UserProductScreen, {
  userProductsScreenOptions,
} from "../screens/user/UserProductScreen";
import EditProductScreen, {
  editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import AppButton from "../components/AppButton";
import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth";

const defaultNavOptions = {
  headerTitleStyle: {
    fontFamily: "open-sans-pro",
  },
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrderScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const UserProductsStackNavigator = createStackNavigator();

const UserProductsNavigator = () => {
  return (
    <UserProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStackNavigator.Screen
        name="UserProducts"
        component={UserProductScreen}
        options={userProductsScreenOptions}
      />
      <UserProductsStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </UserProductsStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 50 }}>
            <SafeAreaView
              forceInset={{ top: "always", bottom: "never" }}
              style={styles.safeArea}
            >
              <View>
                <DrawerItemList {...props} />
              </View>
              <AppButton
                buttonStyle={styles.logout}
                textStyle={styles.text}
                onPress={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </AppButton>
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.success,
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-cart" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-list" size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={UserProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons name="md-create" size={23} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  logout: {
    marginHorizontal: 15,
    height: 50,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: 3,
    marginBottom: 30,
    elevation: 0,
  },
  text: {
    color: Colors.success,
  },
});
