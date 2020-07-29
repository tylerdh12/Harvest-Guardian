import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DetailsRoutes } from "../Details";
import { Center } from "../StyledContainers/Center";

const Stack = createStackNavigator();

function MyGarden({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPlants();
  }, []);

  function getPlants() {
    AsyncStorage.getItem("authBasic").then((authBasic) => {
      axios({
        method: "get",
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",
        headers: {
          Authorization: authBasic,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            console.log("Response 401");
            console.log(res);
          } else {
            setData(res.data);
          }
        })
        .then(() => setLoading(false));
    });
  }

  const datePlanted = (date_planted) => {
    return moment(date_planted).format("l");
  };

  function harvestProgress(date_planted, days_to_harvest) {
    const daysPlantedToNow = moment().diff(date_planted, "days");
    return (daysPlantedToNow / parseInt(days_to_harvest)) * 100;
  }

  function dateToBeHarvested(date_planted, days_to_harvest) {
    const dateToHarvest = moment(date_planted).add(
      parseInt(days_to_harvest),
      "days"
    );
    return moment(dateToHarvest).format("l");
  }

  function onRefresh() {
    setRefreshing: true;
    getPlants();
    setRefreshing: false;
  }

  return (
    <Center>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{
            width: "100%",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }: any) => {
            return (
              <TouchableOpacity
                style={{
                  justifyContent: "center",
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
                  navigation.navigate("Details", {
                    data: item,
                    type: "plant",
                  });
                }}
              >
                <Image
                  source={{
                    uri: `${item.seed.images}`,
                  }}
                  style={{
                    width: "100%",
                    height: 160,
                    borderRadius: 30,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
                <View
                  style={{
                    padding: 30,
                    borderRadius: 30,
                    marginTop: -30,
                    backgroundColor: "rgb(251, 252, 252)",
                    shadowColor: "#000",
                    shadowOffset: { width: -6, height: -6 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item.seed.species}
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      height: 10,
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
                        width: `${harvestProgress(
                          item.seed.date_planted,
                          item.seed.days_to_harvest
                        )}%`,
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
                        {datePlanted(item.seed.date_planted)}
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
                        Day to Harvest
                      </Text>
                      <Text style={{ textAlign: "right" }}>
                        {dateToBeHarvested(
                          item.seed.date_planted,
                          item.seed.days_to_harvest
                        )}
                      </Text>
                    </View>
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

export const MyGardenStack = ({ route, navigation }) => {
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
              onPress={() => navigation.navigate({ screen: "Notifications" })}
            />
          ),
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
        component={MyGarden}
      />
      {DetailsRoutes(Stack)}
    </Stack.Navigator>
  );
};
