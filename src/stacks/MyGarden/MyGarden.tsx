import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardImage } from "../../components/Card/CardImage";
import ProgressBar from "../../components/Card/ProgressBar";
import SpeciesTitle from "../../components/Card/SpeciesTitle";
import {
  CardBody,
  RightAction,
  SafeAreaView,
  View,
} from "../../components/Styles";
import CardDetails from "../../components/Card/CardDetails";

const styles = StyleSheet.create({
  actionText: {
    color: "#fff",
    fontWeight: "700",
    padding: 20,
  },
});

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

  function onRefresh() {
    setRefreshing: true;
    getPlants();
    setRefreshing: false;
  }

  const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity style={{ width: 80 }} onPress={onPress}>
        <RightAction>
          <Animated.Text
            style={[styles.actionText, { transform: [{ scale }] }]}
          >
            <Ionicons name="ios-trash" size={70} />
          </Animated.Text>
        </RightAction>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{ marginTop: 8 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }: any) => {
            return (
              <View style={{ padding: 8 }}>
                <Swipeable
                  friction={2}
                  overshootLeft={false}
                  overshootRight={false}
                  rightThreshold={50}
                  renderRightActions={(progress, dragX) => (
                    <RightActions
                      progress={progress}
                      dragX={dragX}
                      onPress={() => {
                        alert("Delete Pressed");
                      }}
                    />
                  )}
                >
                  <TouchableNativeFeedback
                    onPress={() => {
                      navigation.navigate("Details", {
                        data: item,
                        type: "seed",
                      });
                    }}
                  >
                    <View style={{ backgroundColor: "transparent" }}>
                      <CardImage image={item.seed.images} />
                      <CardBody>
                        <SpeciesTitle species={item.seed.species} />
                        <ProgressBar
                          date_planted={item.date_planted}
                          days_to_harvest={item.seed.days_to_harvest}
                          days_to_germinate={item.seed.days_to_germinate}
                        />
                        <CardDetails
                          date_planted={item.date_planted}
                          days_to_harvest={item.seed.date_to_harvest}
                        />
                      </CardBody>
                    </View>
                  </TouchableNativeFeedback>
                </Swipeable>
              </View>
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
