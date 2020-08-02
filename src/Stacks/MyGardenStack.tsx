import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { Center } from "../components/Center";
import DetailListItem from "../components/DetailListItem";
import theme from "../theme";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "./../components/Styles";

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

    return (daysPlantedToNow / parseInt(days_to_harvest)) * 100 < 100
      ? (daysPlantedToNow / parseInt(days_to_harvest)) * 100
      : 100;
  }

  function harvestProgressColor(
    date_planted,
    days_to_harvest,
    days_to_germinate
  ) {
    const daysPlantedToNow = moment().diff(date_planted, "days");
    if (daysPlantedToNow <= parseInt(days_to_germinate)) {
      return "yellow";
    } else if (daysPlantedToNow <= parseInt(days_to_harvest)) {
      return "rgb(148, 224, 136)";
    } else {
      return "red";
    }
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
                      borderColor: harvestProgressColor(
                        item.date_planted,
                        item.seed.days_to_harvest,
                        item.seed.days_to_germinate
                      ),
                      borderRadius: 10,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        height: 8,
                        backgroundColor: harvestProgressColor(
                          item.date_planted,
                          item.seed.days_to_harvest,
                          item.seed.days_to_germinate
                        ),
                        borderRadius: 10,
                        width: `${harvestProgress(
                          item.date_planted,
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
                          marginTop: 15,
                          marginBottom: 5,
                          fontWeight: "500",
                        }}
                      >
                        Date Planted
                      </Text>
                      <Text style={{ textAlign: "left", marginTop: 5 }}>
                        {datePlanted(item.date_planted)}
                      </Text>
                    </View>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={{
                          textAlign: "right",
                          marginTop: 15,
                          marginBottom: 5,
                          fontWeight: "500",
                        }}
                      >
                        Day to Harvest
                      </Text>
                      <Text
                        style={{
                          textAlign: "right",
                          marginTop: 5,
                          marginBottom: 5,
                          fontWeight: "500",
                        }}
                      >
                        {dateToBeHarvested(
                          item.date_planted,
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

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
  const [data, setData] = useState(route.params.data);

  function deletePlantAlert({ data }) {
    Alert.alert(
      "Are you sure?",
      `Would you still like to remove ${data.seed.species} ${data.seed.variety} from My Garden`,
      [
        {
          text: "Yes - Remove Please",
          onPress: () => deletePlantFromMyGarden({ data }),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  function deletePlantFromMyGarden({ data }) {
    AsyncStorage.getItem("authBasic").then((authBasic) => {
      axios({
        method: "delete",
        url: `https://harvestguardian-rest-api.herokuapp.com/v1/plants/${data._id}`,
        headers: {
          Authorization: authBasic,
        },
      }).then((res) => {
        if (res.status === 401) {
          console.log("Response 401");
          console.log(res);
        } else if (res.status === 200) {
          res.data.deletedCount === 1
            ? alert("Plant Has Been Removed")
            : alert("Error Deleting Plant");
        }
      });
    });
  }

  return (
    <ScrollView>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${data.seed.images}`,
        }}
      />
      <View
        style={{
          paddingTop: 25,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: -30,
        }}
      >
        <DetailListItem label="Variety" dataText={data.seed.variety} />
        <DetailListItem
          label="Date Planted"
          dataText={data.date_planted.slice(0, 10)}
        />
        <DetailListItem label="Description" dataText={data.seed.description} />
        <DetailListItem
          label="Days To Germinate"
          dataText={data.seed.days_to_germinate}
        />
        <DetailListItem
          label="Days To Harvest"
          dataText={data.seed.days_to_harvest}
        />
        <DetailListItem
          label="Anti-Companion Plants"
          dataText={data.seed.non_companions.join(", ")}
        />
        <DetailListItem label="Sun Requirements" dataText={data.seed.sun} />
        <DetailListItem
          label="Soil Temperature High"
          dataText={data.seed.soil_temp_high}
        />
        <DetailListItem label="Sowing Method" dataText={data.seed.sow} />
        <DetailListItem label="Plant Height" dataText={data.seed.height} />
        <DetailListItem label="Seed Depth" dataText={data.seed.depth} />
        <DetailListItem label="Seed Spacing" dataText={data.seed.spacing} />
        <DetailListItem label="Water Requirements" dataText={data.seed.water} />
        <DetailListItem
          label="Planting Months"
          dataText={data.seed.zone._8b.join(", ")}
        />
        <DetailListItem
          label="Nutrient Requirements"
          dataText={data.seed.nutrient.join(", ")}
        />
        <DetailListItem
          label="Soil Temperature Low"
          dataText={data.seed.soil_temp_low}
        />
        <DetailListItem
          label="Byproduct"
          dataText={data.seed.byproducts.join(", ")}
        />
        <DetailListItem
          label="Companion Plants"
          dataText={data.seed.companions.join(", ")}
        />
        <DetailListItem label="Images" dataText={data.seed.images} />
        <DetailListItem label="Complete Data" dataText={data.seed.complete} />
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
              navigation.navigate("EditPlantDetails", {
                data: data,
              });
            }}
          />
          <Button
            title="Delete"
            color="red"
            onPress={() => {
              deletePlantAlert({ data });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function EditPlantDetails({ route, navigation }) {
  const [data, setData] = useState(route.params.data);

  function apiCall(x: any) {
    return x;
  }

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
      <Text style={{ fontSize: 18 }}>Edit {data.seed.species}</Text>
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
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: route.params.data.species,
          headerStyle: {
            backgroundColor: theme.COLORS.PRIMARY,
          },
          headerTintColor: theme.COLORS.HEADERTINT,
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
          headerTitle: `Edit: ${route.params.data.seed.species}`,
          headerRight: () => (
            <Button
              title="Done"
              onPress={({ route }: any) => {
                route.params.submit?.current();
              }}
            />
          ),
          headerStyle: {
            backgroundColor: theme.COLORS.PRIMARY,
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        })}
        name="EditPlantDetails"
        component={EditPlantDetails}
      />
    </Stack.Navigator>
  );
};
