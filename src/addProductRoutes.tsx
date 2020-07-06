import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, ScrollView, Text } from "react-native";
import config from "./../config";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "./ParamLists/MyGardenParamList";
import { SeedLibraryParamList } from "./ParamLists/SeedLibraryParamList";
import { Center } from "./StyledContainers/Center";

function Product({ route, navigation }: MyGardenStackNavProps<"Product">) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://graphql.fauna.com/graphql",
        {
          query: `
          query {
          findPlantByID(id: ${route.params.plantId}) {
            species
            daysToHarvest
            antiCompanionPlants
            sunRequirements
            soilTemperatureHigh
            sowingMethod
            binomialName
            plantHeight
            description
            _id
            completeData
            seedDepth
            datePlanted
            seedSpacing
            daysToGerminate
            variety
            waterRequirements
            plantingMonths
            nutrientRequirements
            soilTemperatureLow
            feedsOn
            byproduct
            companionPlants
            images
          }
        }
        `,
        },
        {
          headers: {
            Authorization: `Bearer ${config.FAUNA_SECRET_KEY}`,
          },
        }
      )
      .then((res) => {
        setData(res.data.data.findPlantByID);
      })
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

  return (
    <Center>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView>
            <Text>species: {data.species}</Text>
            <Text>_id: {data._id}</Text>
            <Text>daysToHarvest: {data.daysToHarvest}</Text>
            <Text>antiCompanionPlants: {data.antiCompanionPlants}</Text>
            <Text>sunRequirements: {data.sunRequirements}</Text>
            <Text>soilTemperatureHigh: {data.soilTemperatureHigh}</Text>
            <Text>sowingMethod: {data.sowingMethod}</Text>
            <Text>binomialName: {data.binomialName}</Text>
            <Text>plantHeight: {data.plantHeight}</Text>
            <Text>description: {data.description}</Text>
            <Text>completeData: {data.completeData}</Text>
            <Text>seedDepth: {data.seedDepth}</Text>
            <Text>datePlanted: {data.datePlanted}</Text>
            <Text>seedSpacing: {data.seedSpacing}</Text>
            <Text>daysToGerminate: {data.daysToGerminate}</Text>
            <Text>variety: {data.variety}</Text>
            <Text>waterRequirements: {data.waterRequirements}</Text>
            <Text>plantingMonths: {data.plantingMonths}</Text>
            <Text>nutrientRequirements: {data.nutrientRequirements}</Text>
            <Text>soilTemperatureLow: {data.soilTemperatureLow}</Text>
            <Text>feedsOn: {data.feedsOn}</Text>
            <Text>byproduct: {data.byproduct}</Text>
            <Text>companionPlants: {data.companionPlants}</Text>
            <Text>images: {data.images}</Text>
          </ScrollView>
          <Button
            title="Remove"
            onPress={() => {
              navigation.navigate("EditProduct", {
                name: route.params.name,
              });
            }}
          />
        </>
      )}
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
    MyGardenParamList | SeedLibraryParamList,
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
