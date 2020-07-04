import { Ionicons } from "@expo/vector-icons";
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
import { addProductRoutes } from "../addProductRoutes";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "../ParamLists/MyGardenParamList";
import config from "./../../config";

interface MyGardenStackProps {}
const Stack = createStackNavigator<MyGardenParamList>();

function MyGarden({ navigation }: MyGardenStackNavProps<"MyGarden">) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);

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
      .finally(setLoading(false));
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
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
            keyExtractor={(product, idx) => product + idx}
            data={data}
          />
        </View>
      )}
      {/* <ScrollView
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
              color: "rgb(85, 150, 224)",
            }}
          >
            Current Weather
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              marginTop: 8,
              color: "rgb(83, 151, 221)",
            }}
          >
            43{" \u2109"}
          </Text>
        </View>
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
                  navigation.navigate("Product", { name: item });
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>{item}</Text>
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
                    <Text style={{ textAlign: "left" }}>June 14, 2020</Text>
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
                    <Text style={{ textAlign: "right" }}>20</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(product, idx) => product + idx}
          data={Array.from(Array(50), () => faker.commerce.product())}
        />
        </ScrollView> */}
    </SafeAreaView>
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
            backgroundColor: "rgb(83, 151, 221)",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={MyGarden}
      />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
