import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { Button, Text } from "react-native";
import { AuthContext } from "./Providers/AuthProvider";
import { HomeStack } from "./Stacks/HomeStack";
import { SearchStack } from "./Stacks/SearchStack";
import { Center } from "./StyledContainers/Center";
import { SettingsStack } from "./Stacks/SettingsStack";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator();

function Profile() {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      />
    </Center>
  );
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
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
      <Tabs.Screen name="Home" component={HomeStack} />
      <Tabs.Screen name="Search" component={SearchStack} />
      <Tabs.Screen name="Profile" component={SettingsStack} />
    </Tabs.Navigator>
  );
};
