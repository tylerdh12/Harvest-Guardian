import { Ionicons } from "@expo/vector-icons";
import { StackNavigationState, TypedNavigator } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
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

function Details({ route, navigation }: MyGardenStackNavProps<"Details">) {
  const [favorite, setFave] = useState(false);

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${route.params.data.images}`,
        }}
      />
      <View style={styles.detailItemContainerEven}>
        <View style={styles.speciesContainer}>
          <Text style={(styles.dataText, styles.species)}>
            {route.params.data.species}
          </Text>
        </View>
        <View style={styles.heartButtonContainer}>
          {favorite ? (
            <Ionicons
              name="md-heart"
              size={26}
              color="red"
              onPress={() => setFave(false)}
            />
          ) : (
            <Ionicons
              name="md-heart-empty"
              size={26}
              color="white"
              onPress={() => setFave(true)}
            />
          )}
        </View>
      </View>
      <View style={styles.detailItemContainerOdd}>
        <Text style={styles.labelText}>Variety: </Text>
        <Text style={styles.dataText}>{route.params.data.variety}</Text>
      </View>
      <View style={styles.detailItemContainerEven}>
        <Text style={styles.labelText}>Date Planted: </Text>
        <Text style={styles.dataText}>{route.params.data.datePlanted}</Text>
      </View>
      <View style={styles.detailItemContainerOdd}>
        <Text style={styles.labelText}>Description: </Text>
        <Text style={styles.dataText}>{route.params.data.description}</Text>
      </View>
      <View style={styles.detailItemContainerEven}>
        <Text style={styles.labelText}>Days To Germinate: </Text>
        <Text style={styles.dataText}>{route.params.data.daysToGerminate}</Text>
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
        <Text style={styles.dataText}>{route.params.data.sunRequirements}</Text>
      </View>
      <View style={styles.detailItemContainerEven}>
        <Text style={styles.labelText}>Soil Temperature High: </Text>
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
        <Text style={styles.labelText}>Water Requirements: </Text>
        <Text style={styles.dataText}>
          {route.params.data.waterRequirements}
        </Text>
      </View>
      <View style={styles.detailItemContainerOdd}>
        <Text style={styles.labelText}>Planting Months: </Text>
        <Text style={styles.dataText}>{route.params.data.plantingMonths}</Text>
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
        <Text style={styles.dataText}>{route.params.data.companionPlants}</Text>
      </View>
      <View style={styles.detailItemContainerOdd}>
        <Text style={styles.labelText}>Images: </Text>
        <Text style={styles.dataText}>{route.params.data.images}</Text>
      </View>
      <View style={styles.detailItemContainerEven}>
        <Text style={styles.labelText}>Complete Data:</Text>
        <Text style={styles.dataText}>{route.params.data.completeData}</Text>
      </View>
      {route.params.type === "plant" ? (
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
              navigation.navigate("EditDetails", {
                name: route.params.data.species,
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
      ) : (
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Button
            title="Edit"
            onPress={() => {
              navigation.navigate("EditDetails", {
                name: route.params.data.species,
              });
            }}
          />
          <Button
            title="Add to Garden"
            color="rgb(148, 224, 136)"
            onPress={() => alert("Seed Added to My Garden")}
          />
        </View>
      )}
    </ScrollView>
  );
}

function apiCall(x: any) {
  return x;
}

function EditDetails({
  route,
  navigation,
}: MyGardenStackNavProps<"EditDetails">) {
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

export const DetailsRoutes = (
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
        options={({ route }: any) => ({
          headerTitle: route.params.data.species,
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#fff",
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
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => {
                route.params.submit?.current();
              }}
            />
          ),
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        })}
        name="EditDetails"
        component={EditDetails}
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
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "#323030",
  },
  detailItemContainerEven: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "#403D3D",
  },
  labelText: {
    width: "35%",
    textAlign: "left",
    paddingLeft: 12,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  dataText: {
    textAlign: "right",
    paddingRight: 12,
    width: "65%",
    color: "white",
    fontSize: 15,
    fontWeight: "300",
  },
  speciesContainer: {
    width: "80%",
  },
  species: {
    paddingLeft: 12,
    width: "65%",
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  heartButtonContainer: {
    width: "20%",
    textAlign: "right",
    alignItems: "flex-end",
    paddingRight: 12,
  },
});
