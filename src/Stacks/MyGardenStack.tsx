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
import NotificationModal from "../components/NotificationModal";
import theme from "../theme";
import {
  CardBody,
  CardWrapper,
  ScrollView,
  Text,
  View,
  ViewAlt,
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
      return "tomato";
    }
  }

  function dateToBeHarvested(date_planted, days_to_harvest) {
    const dateToHarvest = moment(date_planted).add(
      parseInt(days_to_harvest),
      "days"
    );
    const numberOfDays = moment().diff(dateToHarvest, "days");
    if (Math.sign(numberOfDays) == -1) {
      return moment(dateToHarvest).format("l");
    } else {
      return "Ready";
    }
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
              <CardWrapper
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
                <CardBody>
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item.seed.species}
                  </Text>
                  <ViewAlt
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
                    <ViewAlt
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
                    ></ViewAlt>
                  </ViewAlt>
                  <ViewAlt style={{ flexDirection: "row" }}>
                    <ViewAlt style={{ width: "50%" }}>
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
                    </ViewAlt>
                    <ViewAlt style={{ width: "50%" }}>
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
                    </ViewAlt>
                  </ViewAlt>
                </CardBody>
              </CardWrapper>
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
      <ViewAlt
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
          dataText={moment(data.date_planted).format("l")}
        />
        <DetailListItem label="Description" dataText={data.seed.description} />
        {data.seed.days_to_germinate ? (
          <DetailListItem
            label="Days To Germinate"
            dataText={data.seed.days_to_germinate}
          />
        ) : null}
        {data.seed.days_to_harvest ? (
          <DetailListItem
            label="Days To Harvest"
            dataText={data.seed.days_to_harvest}
          />
        ) : null}
        {data.seed.non_companions ? (
          <DetailListItem
            label="Anti-Companion Plants"
            dataText={data.seed.non_companions.join(", ")}
          />
        ) : null}
        {data.seed.sun ? (
          <DetailListItem label="Sun Requirements" dataText={data.seed.sun} />
        ) : null}
        {data.seed.soil_temp_high ? (
          <DetailListItem
            label="Soil Temperature High"
            dataText={data.seed.soil_temp_high}
          />
        ) : null}
        {data.seed.sow_indoor !== "" ? (
          <DetailListItem
            label="Sowing Indoor"
            dataText={data.seed.sow_indoor}
          />
        ) : null}
        {data.seed.sow_outdoor !== "" ? (
          <DetailListItem
            label="Sowing Outdoor"
            dataText={data.seed.sow_outdoor}
          />
        ) : null}
        {data.seed.height ? (
          <DetailListItem label="Plant Height" dataText={data.seed.height} />
        ) : null}
        {data.seed.depth ? (
          <DetailListItem label="Seed Depth" dataText={data.seed.depth} />
        ) : null}
        {data.seed.spacing ? (
          <DetailListItem label="Seed Spacing" dataText={data.seed.spacing} />
        ) : null}
        {data.seed.water ? (
          <DetailListItem
            label="Water Requirements"
            dataText={data.seed.water}
          />
        ) : null}
        {data.seed.zone._8b ? (
          <DetailListItem
            label="Planting Months"
            dataText={data.seed.zone._8b.join(", ")}
          />
        ) : null}
        {data.seed.nutrient ? (
          <DetailListItem
            label="Nutrient Requirements"
            dataText={data.seed.nutrient.join(", ")}
          />
        ) : null}
        {data.seed.soil_temp_low ? (
          <DetailListItem
            label="Soil Temperature Low"
            dataText={data.seed.soil_temp_low}
          />
        ) : null}
        {data.seed.byproducts ? (
          <DetailListItem
            label="Byproduct"
            dataText={data.seed.byproducts.join(", ")}
          />
        ) : null}
        {data.seed.companions ? (
          <DetailListItem
            label="Companion Plants"
            dataText={data.seed.companions.join(", ")}
          />
        ) : null}
        {data.seed.complete === true ? (
          <DetailListItem label="Complete Data" dataText="Yes" />
        ) : (
          <DetailListItem label="Complete Data" dataText="No" />
        )}
        {data.seed.public === true ? (
          <DetailListItem label="Public Seed" dataText="Yes" />
        ) : (
          <DetailListItem label="Public Seed" dataText="No" />
        )}
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
      </ViewAlt>
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
  const notificationsList = ["Test Notifications", "Second Notification"];
  return (
    <Stack.Navigator initialRouteName="MyGarden">
      <Stack.Screen
        name="MyGarden"
        options={{
          headerTitle: "My Garden",
          headerRight: (notificationsList) => (
            <NotificationModal notify={notificationsList} />
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
