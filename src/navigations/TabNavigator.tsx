import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppIcon from '../components/ui/appIcon';
import {AppColorsTheme2} from '../constants/Colors';
import {ScreenNames, StackNames} from '../constants/ScreenNames';
import MapScreen from '../screens/MapScreen';
import HomeStackNavigator from './HomeStackNAvigator';
import ProfileStack from './ProfileStack';
import CartStack from './CartStack';
// import HomeStackNavigator from './HomeStackNavigator.tsx';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: AppColorsTheme2.white,
        tabBarActiveTintColor: AppColorsTheme2.secondary,
        tabBarStyle: {
          backgroundColor: AppColorsTheme2.primary,
        },
      }}>
      <Tab.Screen
        name={StackNames.Home_Stack}
        component={HomeStackNavigator}
        options={{
          headerTitle: 'main app',
          tabBarIcon: ({color, size, focused}) => {
            return (
              <AppIcon type="Ionicons" size={size} color={color} name="home" />
            );
          },
        }}
      />
      <Tab.Screen
        name={ScreenNames.CATEGORY_SCREEN}
        component={MapScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            return (
              <AppIcon type="MaterialIcons" color={color} name="category" />
            );
          },
        }}
      />
      <Tab.Screen
        name={StackNames.CART_STACK}
        component={CartStack}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            return <AppIcon type="Ionicons" color={color} name="cart" />;
          },
        }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => {
            return <AppIcon type="Ionicons" color={color} name="person" />;
          },
        }}
        name={StackNames.Profile_Stack}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
}
