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
      .finally(() => setLoading(false));
  }, []);

  return (
    <Center>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <ScrollView>
            <Text>Species: {data.species}</Text>
            <Text>ID: {data._id}</Text>
            <Text>Days To Harvest: {data.daysToHarvest}</Text>
            <Text>Anti-Companion Plants: {data.antiCompanionPlants}</Text>
            <Text>Sun Requirements: {data.sunRequirements}</Text>
            <Text>Soil TemperatureHigh: {data.soilTemperatureHigh}</Text>
            <Text>Sowing Method: {data.sowingMethod}</Text>
            <Text>Binomial Name: {data.binomialName}</Text>
            <Text>Plant Height: {data.plantHeight}</Text>
            <Text>Description: {data.description}</Text>
            <Text>Seed Depth: {data.seedDepth}</Text>
            <Text>Date Planted: {data.datePlanted}</Text>
            <Text>Seed Spacing: {data.seedSpacing}</Text>
            <Text>Days To Germinate: {data.daysToGerminate}</Text>
            <Text>Variety: {data.variety}</Text>
            <Text>Water Requirements: {data.waterRequirements}</Text>
            <Text>Planting Months: {data.plantingMonths}</Text>
            <Text>Nutrient Requirements: {data.nutrientRequirements}</Text>
            <Text>Soil Temperature Low: {data.soilTemperatureLow}</Text>
            <Text>Feeds On: {data.feedsOn}</Text>
            <Text>Byproduct: {data.byproduct}</Text>
            <Text>Companion Plants: {data.companionPlants}</Text>
            <Text>Images: {data.images}</Text>
            <Text>Complete Data: {data.completeData}</Text>
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
