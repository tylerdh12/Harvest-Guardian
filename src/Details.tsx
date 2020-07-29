import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Center } from "./StyledContainers/Center";
import theme from "./theme";

function addSeedToMyGarden({ route }) {
  AsyncStorage.getItem("authBasic").then((authBasic) => {
    axios({
      method: "post",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",
      headers: {
        Authorization: authBasic,
      },
      data: route.params.data._id,
    }).then((res) => {
      if (res.status === 401) {
        console.log("Response 401");
        console.log(res);
      } else {
        Alert.alert(
          "Seed Planted",
          `${route.params.data.species} - ${route.params.data.variety} has been added to My Garden`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    });
  });
}

function deletePlantAlert({ route }) {
  Alert.alert(
    "Are you sure?",
    `Would you still like to remove ${route.params.data.seed.species} ${route.params.data.seed.variety} from My Garden`,
    [
      {
        text: "Yes - Remove Please",
        onPress: () => deletePlantFromMyGarden({ route }),
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

function deletePlantFromMyGarden({ route }) {
  AsyncStorage.getItem("authBasic").then((authBasic) => {
    axios({
      method: "delete",
      url: `https://harvestguardian-rest-api.herokuapp.com/v1/plants/${route.params.data._id}`,
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

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${route.params.data.seed.images}`,
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
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Variety: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.variety}</Text>
        </View>
        {route.params.data.seed.date_planted ? (
          <View style={styles.detailItemContainer}>
            <Text style={styles.labelText}>Date Planted: </Text>
            <Text style={styles.dataText}>
              {route.params.data.seed.date_planted.slice(0, 10)}
            </Text>
          </View>
        ) : null}
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Description: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.description}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Days To Germinate: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.days_to_germinate}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Days To Harvest: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.days_to_harvest}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Anti-Companion Plants: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.non_companions.join(", ")}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Sun Requirements: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.sun}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Soil Temperature High: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.soil_temp_high}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Sowing Method: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.sow}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Plant Height: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.height}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Seed Depth: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.depth}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Seed Spacing: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.spacing}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Water Requirements: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.water}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Planting Months: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.zone._8b.join(", ")}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Nutrient Requirements: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.nutrient.join(", ")}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Soil Temperature Low: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.soil_temp_low}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Byproduct: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.byproducts.join(", ")}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Companion Plants: </Text>
          <Text style={styles.dataText}>
            {route.params.data.seed.companions.join(", ")}
          </Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Images: </Text>
          <Text style={styles.dataText}>{route.params.data.seed.images}</Text>
        </View>
        <View style={styles.detailItemContainer}>
          <Text style={styles.labelText}>Complete Data:</Text>
          <Text style={styles.dataText}>{route.params.data.seed.complete}</Text>
        </View>
        {route.params.type === "plant" ? (
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              padding: 15,
            }}
          >
            <Button
              title="Edit"
              onPress={() => {
                navigation.navigate("EditDetails", {
                  name: route.params.data.seed.species,
                });
              }}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                deletePlantAlert({ route });
              }}
            />
          </View>
        ) : (
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
                navigation.navigate("EditDetails", {
                  name: route.params.data.seed.species,
                });
              }}
            />
            <Button
              title="Add to Garden"
              color={theme.COLORS.PRIMARY}
              onPress={() => addSeedToMyGarden({ route })}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function apiCall(x: any) {
  return x;
}

function EditDetails({ route, navigation }) {
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
      <Text>Edit {route.params.name}</Text>
    </Center>
  );
}

export const DetailsRoutes = (Stack) => {
  return (
    <>
      <Stack.Screen
        options={({ route }: any) => ({
          headerTitle: route.params.data.seed.species,
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
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <Button
              title="Done"
              onPress={() => {
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
        name="EditDetails"
        component={EditDetails}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
