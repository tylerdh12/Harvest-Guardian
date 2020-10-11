import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { CardLayout } from "../../components/Card/CardLayout";
import { SafeAreaView, Text, View, ViewAlt } from "../../components/Styles";
import { getPlants } from "../../utils/Utils";

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
                <CardLayout
                  {...{ item }}
                  navigation={navigation}
                  type="plant"
                />
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
