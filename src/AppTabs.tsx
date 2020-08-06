import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MyGardenStack } from "./stacks/MyGardenStack";
import { SeedLibraryStack } from "./stacks/SeedLibraryStack";
import { SettingsStack } from "./stacks/SettingsStack";

const Tabs = createBottomTabNavigator();

export const AppTabs = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="MyGarden"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "My Garden") {
            return <FontAwesome5 name="seedling" size={size} color={color} />;
          } else if (route.name === "Seed Library") {
            return (
              <MaterialCommunityIcons
                name="seed-outline"
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Settings") {
            return <Ionicons name="ios-settings" size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: "#403D3D",
        inactiveTintColor: "#6e6f73",
        style: {
          backgroundColor: "rgb(148, 224, 136)",
        },
      }}
    >
      <Tabs.Screen name="My Garden" component={MyGardenStack} />
      <Tabs.Screen name="Seed Library" component={SeedLibraryStack} />
      <Tabs.Screen name="Settings" component={SettingsStack} />
    </Tabs.Navigator>
  );
};
