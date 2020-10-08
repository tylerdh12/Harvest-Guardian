import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardLayout } from "../../components/Card/CardLayout";
import { LeftActionAdd } from "../../components/Card/LeftActionAdd";
import { SafeAreaView, View } from "../../components/Styles";
import { AddSeedToMyGarden } from "../../utils/Utils";

interface SeedLibraryProps {
  navigation: any;
}

export const SeedLibrary: React.FC<SeedLibraryProps> = ({ navigation }) => {
  const [] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing] = useState(false);
  const [data, setData] = useState([]);
  const [search, updateSearch] = useState("");

  function getSeeds() {
    axios
      .get("https://harvestguardian-rest-api.herokuapp.com/v1/seeds")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => alert(error))
      .finally(() => setIsLoading(false));
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
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
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
                  // overshootRight={false}
                  // rightThreshold={50}
                  // renderRightActions={(progress, dragX) => (
                  //   <RightActionDelete
                  //     progress={progress}
                  //     dragX={dragX}
                  //     onPress={() => {
                  //       alert("Delete Pressed");
                  //     }}
                  //   />
                  // )}
                  leftThreshold={70}
                  renderLeftActions={(progress, dragX) => (
                    <LeftActionAdd
                      progress={progress}
                      dragX={dragX}
                      onPress={() => {
                        const data = item;
                        // console.log({ data });
                        AddSeedToMyGarden({
                          data,
                          navigation,
                        });
                      }}
                    />
                  )}
                >
                  <CardLayout
                    {...{ item }}
                    navigation={navigation}
                    type="seed"
                  />
                </Swipeable>
              </View>
            )}
            keyExtractor={(detail: any, idx) => detail + idx}
            data={data}
          />
        </>
      )}
    </SafeAreaView>
  );
};
