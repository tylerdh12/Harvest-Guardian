import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MyGardenStack } from "./Stacks/MyGardenStack";
import { SearchStack } from "./Stacks/SearchStack";
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

          if (route.name === "MyGarden") {
            return <Ionicons name="ios-home" size={size} color={color} />;
          } else if (route.name === "Search") {
            return <Ionicons name="ios-search" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <Ionicons name="ios-person" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: "rgb(10, 132, 255)",
        inactiveTintColor: "rgb(142, 142, 147)",
      }}
    >
      <Tabs.Screen name="MyGarden" component={MyGardenStack} />
      <Tabs.Screen name="Search" component={SearchStack} />
      <Tabs.Screen name="Profile" component={SettingsStack} />
    </Tabs.Navigator>
  );
};
