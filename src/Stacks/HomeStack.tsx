import { createStackNavigator } from "@react-navigation/stack";
import faker from "faker";
import React from "react";
import { FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addProductRoutes } from "../addProductRoutes";
import { Center } from "../StyledContainers/Center";
import {
  HomeParamList,
  HomeStackNavProps,
} from "./../ParamLists/HomeParamList";

interface HomeStackProps {}
const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
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
                padding: 15,
                margin: 10,
                backgroundColor: "lightblue",
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

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={Feed} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
