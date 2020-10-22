import { createStackNavigator } from "@react-navigation/stack";
import { default as React } from "react";
import { AdminPanel } from "./AdminPanel";
import CreateSeed  from "./CreateSeed";

const Stack = createStackNavigator();

export const Admin = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin Panel"
        component={AdminPanel}
        options={{
          headerTitle:"Admin Panel",
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="Create Seed"
        component={CreateSeed}
        options={{
          headerTitle:"Create a New Seed",
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};
