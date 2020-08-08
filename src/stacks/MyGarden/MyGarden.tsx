import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import {
  CardBody,
  CardWrapper,
  SafeAreaView,
  Text,
  ViewAlt,
} from "../../components/Styles";

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
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

export default MyGarden;
