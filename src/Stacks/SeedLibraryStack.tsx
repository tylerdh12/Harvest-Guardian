import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import config from "../../config.js";
import { addProductRoutes } from "../addProductRoutes";
import { SeedLibraryParamList } from "../ParamLists/SeedLibraryParamList";
import { Center } from "../StyledContainers/Center";

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
                daysToHarvest
                variety
                plantingMonths
                species
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
    <SafeAreaView>
      {isLoading ? (
        <Center>
          <ActivityIndicator size="large" />
        </Center>
      ) : (
        <View style={{ width: "100%" }}>
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
                    navigation.navigate("Product", { name: item.species });
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item.species}
                  </Text>
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
            backgroundColor: "rgb(83, 151, 221)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={SeedLibrary}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
