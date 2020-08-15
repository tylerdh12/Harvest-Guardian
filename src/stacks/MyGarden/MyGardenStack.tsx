import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import NotificationModal from "../../components/NotificationModal";
import { TouchableOpacity } from "../../components/Styles";
import theme from "../../theme";
import Details from "./Details";
import EditPlantDetails from "./Edit";
import { MyGarden } from "./MyGarden";

const Stack = createStackNavigator();

export const MyGardenStack = ({ route, navigation }) => {
  const notificationsList = ["Test Notifications", "Second Notification"];
  return (
    <Stack.Navigator initialRouteName="MyGarden">
      <Stack.Screen
        name="MyGarden"
        options={{
          headerTitle: "My Garden",
          headerRight: (notificationsList) => (
            <NotificationModal notify={notificationsList} />
          ),
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
        component={MyGarden}
      />
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: route.params.data.seed.species,
          headerStyle: {
            backgroundColor: theme.COLORS.PRIMARY,
          },
          headerTintColor: theme.COLORS.HEADERTINT,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        })}
        name="Details"
        component={Details}
      />
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: `Edit: ${route.params.data.seed.species}`,
          headerRight: () => (
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                height: 38,
                width: 75,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={({ route }: any) => {
                route.params.submit?.current();
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.COLORS.PRIMARY,
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        })}
        name="EditPlantDetails"
        component={EditPlantDetails}
      />
    </Stack.Navigator>
  );
};
