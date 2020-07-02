import { createStackNavigator } from "@react-navigation/stack";
import faker from "faker";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { addProductRoutes } from "../addProductRoutes";
import { SearchParamList } from "../ParamLists/SearchParamList";
import { Center } from "../StyledContainers/Center";

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }: any) {
  const [show, setShow] = useState(false);
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
                justifyContent: "center",
                padding: 30,
                margin: 12,
                backgroundColor: "rgb(251, 252, 252)",
                borderRadius: 30,
                shadowColor: "#000",
                shadowOffset: { width: 6, height: 5 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
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

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        options={{
          headerStyle: {
            backgroundColor: "rgb(83, 151, 221)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={Search}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
