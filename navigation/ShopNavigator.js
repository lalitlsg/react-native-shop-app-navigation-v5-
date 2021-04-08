import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetail: ProductDetailScreen,
});

export default createAppContainer(ProductsNavigator);
