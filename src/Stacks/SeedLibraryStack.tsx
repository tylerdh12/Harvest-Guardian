import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DetailListItem from "./../Components/DetailListItem";
import { Center } from "./../StyledContainers/Center";
import theme from "./../theme";

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
                onPress={() =>
                  navigation.navigate("Details", {
                    data: item,
                    type: "seed",
                  })
                }
              >
                <Image
                  source={{
                    uri: `${item.images}`,
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
                    marginBottom: -30,
                    backgroundColor: "rgb(251, 252, 252)",
                    shadowColor: "#000",
                    shadowOffset: { width: 6, height: 5 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  }}
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
                        Harvest in {item.days_to_harvest}
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
                    {item.zone._8b.join(", ")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(detail: any, idx) => detail + idx}
          data={data}
        />
      )}
    </Center>
  );
}

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
  const [data, setData] = useState(route.params.data);

  function addSeedToMyGarden({ data }) {
    AsyncStorage.getItem("authBasic").then((authBasic) => {
      axios({
        method: "post",
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",
        headers: {
          Authorization: authBasic,
        },
        data: data,
      }).then((res) => {
        if (res.status === 401) {
          console.log("Response 401");
          console.log(res);
        } else {
          Alert.alert(
            "Seed Planted",
            `${data.species} - ${data.variety} has been added to My Garden`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          navigation.goBack();
        }
      });
    });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${data.images}`,
        }}
      />
      <View
        style={{
          paddingTop: 25,
          backgroundColor: "#403D3D",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: -30,
        }}
      >
        <DetailListItem label="Variety" dataText={data.variety} />
        <DetailListItem label="Description" dataText={data.description} />
        <DetailListItem
          label="Days To Germinate"
          dataText={data.days_to_germinate}
        />
        <DetailListItem
          label="Days To Harvest"
          dataText={data.days_to_harvest}
        />
        <DetailListItem
          label="Anti-Companion Plants"
          dataText={data.non_companions.join(", ")}
        />
        <DetailListItem label="Sun Requirements" dataText={data.sun} />
        <DetailListItem
          label="Soil Temperature High"
          dataText={data.soil_temp_high}
        />
        <DetailListItem label="Sowing Method" dataText={data.sow} />
        <DetailListItem label="Plant Height" dataText={data.height} />
        <DetailListItem label="Seed Depth" dataText={data.depth} />
        <DetailListItem label="Seed Spacing" dataText={data.spacing} />
        <DetailListItem label="Water Requirements" dataText={data.water} />
        <DetailListItem
          label="Planting Months"
          dataText={data.zone._8b.join(", ")}
        />
        <DetailListItem
          label="Nutrient Requirements"
          dataText={data.nutrient.join(", ")}
        />
        <DetailListItem
          label="Soil Temperature Low"
          dataText={data.soil_temp_low}
        />
        <DetailListItem
          label="Byproduct"
          dataText={data.byproducts.join(", ")}
        />
        <DetailListItem
          label="Companion Plants"
          dataText={data.companions.join(", ")}
        />
        <DetailListItem label="Images" dataText={data.images} />
        <DetailListItem label="Complete Data" dataText={data.complete} />
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
              navigation.navigate("EditSeedDetails", {
                data: data,
              });
            }}
          />
          <Button
            title="Add to Garden"
            color={theme.COLORS.PRIMARY}
            onPress={() => addSeedToMyGarden({ data })}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function EditSeedDetails({ route, navigation }) {
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
      <Text>Edit {data.species}</Text>
    </Center>
  );
}

export const SeedLibraryStack = ({ route, navigation }) => {
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
          headerTitle: `Edit: ${route.params.data.species}`,
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
        name="EditSeedDetails"
        component={EditSeedDetails}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#323030",
  },
  detailItemContainer: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "#403D3D",
    borderBottomWidth: 4,
    borderBottomColor: "#323030",
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
