import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardLayout } from "../../components/Card/CardLayout";
import { SafeAreaView, View } from "../../components/Styles";
import { deletePlantAlert, getPlants } from "../../utils/Utils";
import { RightActionDelete } from "./../../components/Card/RightActionDelete";

interface MyGardenProps {
  navigation: any;
}

export const MyGarden: React.FC<MyGardenProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getPlants(setData, setLoading);
  }, []);

  function onRefresh() {
    setRefreshing: true;
    getPlants(setData, setLoading);
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
                    onPress={(setData, setLoading) => {
                      deletePlantAlert({
                        data: item,
                        navigation,
                        setData,
                        setLoading,
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
      )}
    </SafeAreaView>
  );
};
