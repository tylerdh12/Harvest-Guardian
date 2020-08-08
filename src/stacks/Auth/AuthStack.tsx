/* -------------------------------------------------------------------------- */
/*                            Authentication Stack                           */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./Login";
import Register from "./Register";

/* ------------------------------ Define Stack ------------------------------ */

const Stack = createStackNavigator();

export const AuthStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
