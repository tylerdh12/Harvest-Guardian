import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  RefreshControl,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardLayout } from "../../components/Card/CardLayout";
import { SafeAreaView, View } from "../../components/Styles";
import { RightActionDelete } from "./../../components/Card/RightActionDelete";

interface MyGardenProps {
  navigation: any;
}

export const MyGarden: React.FC<MyGardenProps> = ({ navigation }) => {
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
          renderItem={({ item }) => (
            <View style={{ padding: 8 }}>
              <Swipeable
                friction={2}
                overshootLeft={false}
                overshootRight={false}
                rightThreshold={50}
                renderRightActions={(progress, dragX) => (
                  <RightActionDelete
                    progress={progress}
                    dragX={dragX}
                    onPress={() => {
                      alert("Delete Pressed");
                    }}
                  />
                )}
              >
                <CardLayout
                  {...{ item }}
                  navigation={navigation}
                  type="plant"
                />
              </Swipeable>
            </View>
          )}
          keyExtractor={(plant: any, idx) => plant + idx}
          data={data}
        />
      )}
    </SafeAreaView>
  );
};
