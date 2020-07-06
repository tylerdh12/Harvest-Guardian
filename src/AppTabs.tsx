import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MyGardenStack } from "./Stacks/MyGardenStack";
import { SeedLibraryStack } from "./Stacks/SeedLibraryStack";
import { SettingsStack } from "./Stacks/SettingsStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator();

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="MyGarden"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "My Garden") {
            return <Ionicons name="ios-leaf" size={size} color={color} />;
          } else if (route.name === "Seed Library") {
            return <Ionicons name="ios-book" size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <Ionicons name="ios-settings" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: "rgb(148, 224, 136)",
        inactiveTintColor: "rgb(142, 142, 147)",
      }}
    >
      <Tabs.Screen name="My Garden" component={MyGardenStack} />
      <Tabs.Screen name="Seed Library" component={SeedLibraryStack} />
      <Tabs.Screen name="Settings" component={SettingsStack} />
    </Tabs.Navigator>
  );
};
