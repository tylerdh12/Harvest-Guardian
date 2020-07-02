import { createStackNavigator } from "@react-navigation/stack";
import faker from "faker";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addProductRoutes } from "../addProductRoutes";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "../ParamLists/MyGardenParamList";
import { Center } from "../StyledContainers/Center";

interface MyGardenStackProps {}
const Stack = createStackNavigator<MyGardenParamList>();

function MyGarden({ navigation }: MyGardenStackNavProps<"MyGarden">) {
  return (
    <Center>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
          marginTop: 0,
          marginBottom: 10,
          backgroundColor: "rgb(128, 237, 197)",
        }}
      >
        <Text>Weather</Text>
      </View>
      <FlatList
        style={{
          width: "100%",
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 30,
                margin: 10,
                backgroundColor: "rgb(128, 237, 197)",
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("Product", { name: item });
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

export const PlantDetails = () => {};

export const MyGardenStack: React.FC<MyGardenStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="MyGarden">
      <Stack.Screen
        name="MyGarden"
        options={{
          headerTitle: "My Garden",
        }}
        component={MyGarden}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
