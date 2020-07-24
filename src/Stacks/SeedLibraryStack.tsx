import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DetailsRoutes } from "../Details";
import { Center } from "./../StyledContainers/Center";

const Stack = createStackNavigator();

function SeedLibrary({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  function getSeeds() {
    axios
      .get("https://harvestguardian-rest-api.herokuapp.com/v1/seeds")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }

  function onRefresh() {
    setRefreshing: true;
    getSeeds();
    setRefreshing: false;
  }

  useEffect(() => {
    getSeeds();
  }, []);

  return (
    <Center>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
                  onPress={() =>
                    navigation.navigate("Details", {
                      data: item,
                      type: "seed",
                    })
                  }
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "50%" }}>
                      <Text style={{ fontSize: 18, fontWeight: "600" }}>
                        {item.species}
                      </Text>
                      <Text style={{ fontSize: 15, fontWeight: "400" }}>
                        {item.variety}
                      </Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          textAlign: "right",
                          marginTop: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "500",
                        }}
                      >
                        Harvest in {item.daysToHarvest}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "500",
                      padding: 6,
                      marginTop: 8,
                    }}
                  >
                    {item.plantingMonths}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(detail: any, idx) => detail + idx}
            data={data}
          />
        </ScrollView>
      )}
    </Center>
  );
}

export const SeedLibraryStack = ({}) => {
  return (
    <Stack.Navigator initialRouteName="SeedLibrary">
      <Stack.Screen
        name="Seed Library"
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
        component={SeedLibrary}
      />
      {DetailsRoutes(Stack)}
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
