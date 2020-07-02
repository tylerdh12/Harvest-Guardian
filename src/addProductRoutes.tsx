import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Button, Text } from "react-native";
import { HomeParamList, HomeStackNavProps } from "./ParamLists/HomeParamList";
import { SearchParamList } from "./ParamLists/SearchParamList";
import { Center } from "./StyledContainers/Center";

function Product({ route, navigation }: HomeStackNavProps<"Product">) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
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

function EditProduct({ route, navigation }: HomeStackNavProps<"EditProduct">) {
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
    HomeParamList | SearchParamList,
    StackNavigationState,
    any,
    any,
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
