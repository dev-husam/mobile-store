import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { ScreenNames } from "../constants/ScreenNames";
import EditProfileScreen from "../screens/EditProfileScreen";
import PrivacyAndPolicyScreen from "../screens/PrivacyAndPolicyScreen";
import FavotiesScreen from "../screens/FavotiesScreen";
import ContactUs from "../screens/ContactUsScreen";
import MyCarScreen from "../screens/MyCarScreen";
import { useTranslation } from "react-i18next";
import JoinUsScreen from "../screens/JoinUsScreen";
import AboutYamakAppScreen from "../screens/AboutYamakAppScreen";
import FreshCharScreen from "../screens/FreshCharScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();
const CartStack = () => {
  const { t } = useTranslation()
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName={ScreenNames.CART_SCREEN}
    >
      <Stack.Screen
        options={{ headerShown: false, }}
        name={ScreenNames.CART_SCREEN}
        component={CartScreen}
      />

    </Stack.Navigator>
  );
};

export default CartStack;
