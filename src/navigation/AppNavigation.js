import React, { useState, useCallback } from "react";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import DevicesScreen from "../screens/DevicesScreen";
import RemoteScreen from "../screens/RemoteScreen";
import SettingsScreen from "../screens/SettingsScreen";

export default function AppNavigation() {
  const [route, setRoute] = useState("Home");

  const navigation = {
    navigate: useCallback((name) => setRoute(name), []),
    goBack: useCallback(() => setRoute("Home"), []),
  };

  let ScreenComponent = null;
  if (route === "Home") ScreenComponent = HomeScreen;
  else if (route === "Devices") ScreenComponent = DevicesScreen;
  else if (route === "Remote") ScreenComponent = RemoteScreen;
  else if (route === "Settings") ScreenComponent = SettingsScreen;

  return (
    <View style={{ flex: 1 }}>
      {ScreenComponent ? (
        <ScreenComponent navigation={navigation} />
      ) : null}
    </View>
  );
}
