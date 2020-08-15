import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardLayout } from "../../components/Card/CardLayout";
import { RightActionDelete } from "../../components/Card/RightActionDelete";
import { SafeAreaView, View } from "../../components/Styles";

interface SeedLibraryProps {
  navigation: any;
}

export const SeedLibrary: React.FC<SeedLibraryProps> = ({ navigation }) => {
  const [] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [refreshing] = useState(false);
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
    <SafeAreaView>
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
                <CardLayout {...{ item }} navigation={navigation} type="seed" />
              </Swipeable>
            </View>
          )}
          keyExtractor={(detail: any, idx) => detail + idx}
          data={data}
        />
      )}
    </SafeAreaView>
  );
};
