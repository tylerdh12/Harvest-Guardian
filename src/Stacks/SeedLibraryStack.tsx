import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import config from "../../config.js";
import { addProductRoutes } from "../addProductRoutes";
import { SeedLibraryParamList } from "../ParamLists/SeedLibraryParamList";

interface SeedLibraryStackProps {}

const Stack = createStackNavigator<SeedLibraryParamList>();

function SeedLibrary({ navigation }: any) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post(
        "https://graphql.fauna.com/graphql",
        {
          query: `
          query {
            allSeeds {
              data {
                _id
                species
                variety
                plantingMonths
                daysToHarvest
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
        setData(res.data.data.allSeeds.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.center}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
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
                      type: "seed",
                    });
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "50%" }}>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        {item.species}
                      </Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          textAlign: "right",
                          marginTop: 2,
                          fontWeight: "500",
                        }}
                      >
                        Harvest in {item.daysToHarvest}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(product: any, idx) => product + idx}
            data={data}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export const SeedLibraryStack: React.FC<SeedLibraryStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="SeedLibrary">
      <Stack.Screen
        name="SeedLibrary"
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
        component={SeedLibrary}
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
