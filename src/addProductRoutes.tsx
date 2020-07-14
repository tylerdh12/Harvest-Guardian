import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "./ParamLists/MyGardenParamList";
import { SeedLibraryParamList } from "./ParamLists/SeedLibraryParamList";
import { Center } from "./StyledContainers/Center";

function Product({ route, navigation }: MyGardenStackNavProps<"Product">) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <Image
          style={{ width: "100%", height: 300 }}
          source={{
            uri:
              "https://d2ebzu6go672f3.cloudfront.net/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg",
          }}
        />
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Species: </Text>
          <Text style={styles.dataText}>{route.params.data.species}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Variety: </Text>
          <Text style={styles.dataText}>{route.params.data.variety}</Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Date Planted: </Text>
          <Text style={styles.dataText}>{route.params.data.datePlanted}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Description: </Text>
          <Text style={styles.dataText}>{route.params.data.description}</Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Days To Harvest: </Text>
          <Text style={styles.dataText}>{route.params.data.daysToHarvest}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Anti-Companion Plants: </Text>
          <Text style={styles.dataText}>
            {route.params.data.antiCompanionPlants}
          </Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Sun Requirements: </Text>
          <Text style={styles.dataText}>
            {route.params.data.sunRequirements}
          </Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Soil TemperatureHigh: </Text>
          <Text style={styles.dataText}>
            {route.params.data.soilTemperatureHigh}
          </Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Sowing Method: </Text>
          <Text style={styles.dataText}>{route.params.data.sowingMethod}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Binomial Name: </Text>
          <Text style={styles.dataText}>{route.params.data.binomialName}</Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Plant Height: </Text>
          <Text style={styles.dataText}>{route.params.data.plantHeight}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Seed Depth: </Text>
          <Text style={styles.dataText}>{route.params.data.seedDepth}</Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Seed Spacing: </Text>
          <Text style={styles.dataText}>{route.params.data.seedSpacing}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Days To Germinate: </Text>
          <Text style={styles.dataText}>
            {route.params.data.daysToGerminate}
          </Text>
        </View>

        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Water Requirements: </Text>
          <Text style={styles.dataText}>
            {route.params.data.waterRequirements}
          </Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Planting Months: </Text>
          <Text style={styles.dataText}>
            {route.params.data.plantingMonths}
          </Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Nutrient Requirements: </Text>
          <Text style={styles.dataText}>
            {route.params.data.nutrientRequirements}
          </Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Soil Temperature Low: </Text>
          <Text style={styles.dataText}>
            {route.params.data.soilTemperatureLow}
          </Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Feeds On: </Text>
          <Text style={styles.dataText}>{route.params.data.feedsOn}</Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Byproduct: </Text>
          <Text style={styles.dataText}>{route.params.data.byproduct}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Companion Plants: </Text>
          <Text style={styles.dataText}>
            {route.params.data.companionPlants}
          </Text>
        </View>
        <View style={styles.detailItemContainerOdd}>
          <Text style={styles.labelText}>Images: </Text>
          <Text style={styles.dataText}>{route.params.data.images}</Text>
        </View>
        <View style={styles.detailItemContainerEven}>
          <Text style={styles.labelText}>Complete Data:</Text>
          <Text style={styles.dataText}>{route.params.data.completeData}</Text>
        </View>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Button
            title="Edit"
            onPress={() => {
              navigation.navigate("EditProduct", {
                name: route.params.name,
              });
            }}
          />
          <Button
            title="Delete"
            color="red"
            onPress={() => {
              alert("Plant Removed");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#323030",
  },
  detailItemContainerOdd: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#323030",
  },
  detailItemContainerEven: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#403D3D",
  },
  labelText: {
    width: "50%",
    textAlign: "left",
    paddingLeft: 12,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  dataText: {
    textAlign: "right",
    paddingRight: 12,
    width: "50%",
    color: "white",
    fontSize: 14,
  },
});
