import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DetailsRoutes } from "../Details";
import {
  MyGardenParamList,
  MyGardenStackNavProps,
} from "../ParamLists/MyGardenParamList";
import { AuthContext } from "../Providers/AuthProvider";
import { Center } from "../StyledContainers/Center";

interface MyGardenStackProps {}
const Stack = createStackNavigator<MyGardenParamList>();

function MyGarden(
  this: any,
  { navigation }: MyGardenStackNavProps<"MyGarden">
) {
  const { authBasic } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  React.useEffect(() => {
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
  }, []);

  return (
    <Center style={styles.center}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
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
                onPress={() => {
                  navigation.navigate("Details", {
                    data: item,
                    type: "plant",
                  });
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
                      {item.date_planted.slice(0, 10)}
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
                      {item.days_to_harvest}
                    </Text>
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

export const PlantDetails = () => {};

export const MyGardenStack: React.FC<MyGardenStackProps> = ({
  navigation,
}: any) => {
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
          headerTintColor: "#fff",
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

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
