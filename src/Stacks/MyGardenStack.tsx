import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { addProductRoutes } from "../addProductRoutes";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "../ParamLists/MyGardenParamList";
import { Center } from "../StyledContainers/Center";
import config from "./../../config";

interface MyGardenStackProps {}
const Stack = createStackNavigator<MyGardenParamList>();

function MyGarden({ navigation }: MyGardenStackNavProps<"MyGarden">) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://graphql.fauna.com/graphql",
        {
          query: `
          query {
            allPlants {
              data {
                _id
                datePlanted
                daysToHarvest
                daysToGerminate
                variety
                species
                plantingMonths
                species
                antiCompanionPlants
                sunRequirements
                soilTemperatureHigh
                sowingMethod
                binomialName
                plantHeight
                description
                completeData
                seedDepth
                seedSpacing
                daysToGerminate
                waterRequirements
                nutrientRequirements
                soilTemperatureLow
                feedsOn
                byproduct
                companionPlants
                images
              }
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
        setData(res.data.data.allPlants.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Center style={styles.center}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{
            width: "100%",
          }}
          renderItem={({ item }: any) => {
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
                  navigation.navigate("Product", {
                    data: item,
                    type: "plant",
                  });
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item.species}
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgb(148, 224, 136)",
                    borderRadius: 10,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      backgroundColor: "rgb(148, 224, 136)",
                      borderRadius: 10,
                      width: "20%",
                      flex: 1,
                    }}
                  ></View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        marginTop: 10,
                        marginBottom: 5,
                        fontWeight: "500",
                      }}
                    >
                      Date Planted
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      {item.datePlanted}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text
                      style={{
                        textAlign: "right",
                        marginTop: 10,
                        marginBottom: 5,
                        fontWeight: "500",
                      }}
                    >
                      Days Until Harvest
                    </Text>
                    <Text style={{ textAlign: "right" }}>
                      {item.daysToHarvest}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(plant: any, idx) => plant + idx}
          data={data}
        />
      )}
    </Center>
  );
}

export const PlantDetails = () => {};

export const MyGardenStack: React.FC<MyGardenStackProps> = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="MyGarden">
      <Stack.Screen
        name="MyGarden"
        options={{
          headerTitle: "My Garden",
          headerRight: () => (
            <Ionicons
              style={{
                paddingRight: 15,
              }}
              name="ios-notifications-outline"
              size={24}
              color="white"
              onPress={() => navigation.navigate("Notifications")}
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
        }}
        component={MyGarden}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
