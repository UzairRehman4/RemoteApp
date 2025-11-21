import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import DevicesScreen from "../screens/DevicesScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import SettingsScreen from "../screens/SettingsScreen";
import RemoteControlScreen from "../screens/RemoteControlScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Devices")
            iconName = focused ? "tv" : "tv-outline";
          else if (route.name === "Add Device")
            iconName = focused ? "add-circle" : "add-circle-outline";
          else if (route.name === "Settings")
            iconName = focused ? "settings" : "settings-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { backgroundColor: "#1F2937", borderTopColor: "#374151" },
        headerStyle: { backgroundColor: "#1F2937" },
        headerTintColor: "#fff",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Devices" component={DevicesScreen} />
      <Tab.Screen name="Add Device" component={AddDeviceScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="RemoteControl"
          component={RemoteControlScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: "#1F2937" },
            headerTintColor: "#fff",
            title: "Remote Control",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
