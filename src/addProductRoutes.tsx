import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useRef, useState } from "react";
import { Button, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "./ParamLists/MyGardenParamList";
import { SearchParamList } from "./ParamLists/SearchParamList";
import { Center } from "./StyledContainers/Center";

function Product({ route, navigation }: MyGardenStackNavProps<"Product">) {
  return (
    <Center>
      <ScrollView style={{
        
      }}>
        <Text>Plant Name: </Text>
        <Text></Text>
      </ScrollView>
      <Button
        title="Edit this product"
        onPress={() => {
          navigation.navigate("EditProduct", {
            name: route.params.name,
          });
        }}
      />
    </Center>
  );
}

function apiCall(x: any) {
  return x;
}

function EditProduct({
  route,
  navigation,
}: MyGardenStackNavProps<"EditProduct">) {
  const [formState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    // api call with new form state
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>Edit {route.params.name}</Text>
    </Center>
  );
}

export const addProductRoutes = (
  Stack: TypedNavigator<
    MyGardenParamList | SearchParamList,
    StackNavigationState,
    StackNavigationOptions,
    StackNavigationEventMap,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        options={({ route }: any) => ({ headerTitle: route.params.name })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => {
                route.params.submit?.current();
              }}
            />
          ),
        })}
        name="EditProduct"
        component={EditProduct}
      />
    </>
  );
};
