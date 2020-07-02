import { createStackNavigator } from "@react-navigation/stack";
import faker from "faker";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SearchParamList } from "../ParamLists/SearchParamList";
import { Center } from "../StyledContainers/Center";

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }: any) {
  const [show, setShow] = useState(false);
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

export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};
