import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardLayout } from "../../components/Card/CardLayout";
import { SafeAreaView, Text, View, ViewAlt } from "../../components/Styles";
import { deletePlantAlert, getPlants } from "../../utils/Utils";
import { RightActionDelete } from "./../../components/Card/RightActionDelete";

const { width } = Dimensions.get("window");
interface MyGardenProps {
  navigation: any;
}

export const MyGarden: React.FC<MyGardenProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setRefreshing(true);
      setLoading(true);
      getPlants(setData, setLoading);
      setRefreshing(false);
      setLoading(false);
    });
  }, [navigation]);

  function onRefresh() {
    setRefreshing(true);
    getPlants(setData, setLoading);
    setRefreshing(false);
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <ViewAlt
            style={{
              marginTop: 14,
              padding: 10,
              borderRadius: 15,
              width: width - 20,
              alignItems: "center",
            }}
          >
            <Text>Weather Widget</Text>
            <ViewAlt>
              
              <Text>Now</Text>
            </ViewAlt>
          </ViewAlt>
          <FlatList
            style={{ marginTop: 8 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item, index }) => (
              <View style={{ margin: 8 }}>
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
                        deletePlantAlert({
                          data: item,
                          onRefresh: () => onRefresh(),
                        });
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
        </>
      )}
    </SafeAreaView>
  );
};
