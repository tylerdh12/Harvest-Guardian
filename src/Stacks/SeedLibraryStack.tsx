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
} from "react-native";
import { Center } from "../components/Center";
import DetailListItem from "../components/DetailListItem";
import theme from "../theme";
import {
  Label,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "./../components/Styles";

const Stack = createStackNavigator();

function SeedLibrary({ navigation }) {
  const [search, updateSearch] = useState("");
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
        // <>
        //   <View
        //     style={{
        //       flexDirection: "row",
        //       marginTop: 30,
        //       marginBottom: 20,
        //       borderRadius: 30,
        //       shadowColor: "#000",
        //       shadowOffset: { width: 6, height: 5 },
        //       shadowOpacity: 0.2,
        //       shadowRadius: 4,
        //       elevation: 5,
        //       width: "95%",
        //       padding: 0,
        //     }}
        //   >
        //     <TextInput
        //       style={{
        //         height: "100%",
        //         borderWidth: 0,
        //         borderTopLeftRadius: 30,
        //         borderBottomLeftRadius: 30,
        //         width: "78%",
        //         margin: 0,
        //         color: "black",
        //         backgroundColor: "white",
        //         paddingLeft: 15,
        //         fontSize: 16,
        //       }}
        //       onChangeText={(text) => updateSearch(text)}
        //       value={search}
        //     />
        //     <Button
        //       title="Submit"
        //       onPress={() => {
        //         console.log(search);
        //       }}
        //     />
        //   </View>
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
                    shadowColor: "#000",
                    shadowOffset: { width: -6, height: -6 },
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
        // </>
      )}
    </Center>
  );
}

function Create({ route, navigation }) {
  const [species, updateSpecies] = useState("");
  const [variety, updateVariety] = useState("");
  const [isLoading, updateIsLoading] = useState("");
  const [error, updateError] = useState("");

  return (
    <Center>
      <Label>Species:</Label>
      <TextInput onChangeText={(text) => updateSpecies(text)} value={species} />
      <Label>Vairety:</Label>
      <TextInput onChangeText={(text) => updateVariety(text)} value={variety} />
      <Button
        onPress={() => {
          console.log("submit button pressed");
        }}
        title="Submit"
      />
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
    <ScrollView>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${data.images}`,
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
        {data.variety ? (
          <DetailListItem label="Variety" dataText={data.variety} />
        ) : null}
        {data.description ? (
          <DetailListItem label="Description" dataText={data.description} />
        ) : null}
        {data.days_to_germinate ? (
          <DetailListItem
            label="Days To Germinate"
            dataText={data.days_to_germinate}
          />
        ) : null}
        {data.days_to_harvest ? (
          <DetailListItem
            label="Days To Harvest"
            dataText={data.days_to_harvest}
          />
        ) : null}
        {data.non_companions ? (
          <DetailListItem
            label="Anti-Companion Plants"
            dataText={data.non_companions.join(", ")}
          />
        ) : null}
        {data.sun ? (
          <DetailListItem label="Sun Requirements" dataText={data.sun} />
        ) : null}
        {data.soil_temp_high ? (
          <DetailListItem
            label="Soil Temperature High"
            dataText={data.soil_temp_high}
          />
        ) : null}
        {data.sow_indoor !== "" ? (
          <DetailListItem label="Sowing Indoor" dataText={data.sow_indoor} />
        ) : null}
        {data.sow_outdoor !== "" ? (
          <DetailListItem label="Sowing Outdoor" dataText={data.sow_outdoor} />
        ) : null}
        {data.height ? (
          <DetailListItem label="Plant Height" dataText={data.height} />
        ) : null}
        {data.depth ? (
          <DetailListItem label="Seed Depth" dataText={data.depth} />
        ) : null}
        {data.spacing ? (
          <DetailListItem label="Seed Spacing" dataText={data.spacing} />
        ) : null}
        {data.water ? (
          <DetailListItem label="Water Requirements" dataText={data.water} />
        ) : null}
        {data.zone._8b ? (
          <DetailListItem
            label="Planting Months"
            dataText={data.zone._8b.join(", ")}
          />
        ) : null}
        {data.nutrient ? (
          <DetailListItem
            label="Nutrient Requirements"
            dataText={data.nutrient.join(", ")}
          />
        ) : null}
        {data.soil_temp_low ? (
          <DetailListItem
            label="Soil Temperature Low"
            dataText={data.soil_temp_low}
          />
        ) : null}
        {data.byproducts ? (
          <DetailListItem
            label="Byproduct"
            dataText={data.byproducts.join(", ")}
          />
        ) : null}
        {data.companions ? (
          <DetailListItem
            label="Companion Plants"
            dataText={data.companions.join(", ")}
          />
        ) : null}
        <DetailListItem label="Images" dataText={data.images} />
        {data.complete === true ? (
          <DetailListItem label="Complete Data" dataText="Yes" />
        ) : (
          <DetailListItem label="Complete Data" dataText="No" />
        )}
        {data.public === true ? (
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
          headerTitle: `New Seed`,
          headerStyle: {
            backgroundColor: theme.COLORS.PRIMARY,
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        })}
        name="Create"
        component={Create}
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
