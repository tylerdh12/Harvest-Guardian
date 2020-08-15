import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { Card } from "../../components/Card/Card";
import { SafeAreaView } from "../../components/Styles";
import { AuthContext } from "../../providers/AuthProvider";
import { CardBody, Text, ViewAlt } from "./../../components/Styles";

function SeedLibrary({ navigation }) {
  const [search, updateSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const { userData } = useContext(AuthContext);

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
          style={{
            width: "100%",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Card
              item={item}
              navigation={navigation}
              onLeftPress={() => alert("Seed Added to My Garden!")}
              onRightPress={() => alert("Pressed Delete!")}
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
              <CardBody>
                <ViewAlt style={{ flexDirection: "row" }}>
                  <ViewAlt style={{ width: "50%" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      {item.species}
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "400" }}>
                      {item.variety}
                    </Text>
                  </ViewAlt>
                  <ViewAlt style={{ width: "50%" }}>
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
                  </ViewAlt>
                </ViewAlt>
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
              </CardBody>
            </Card>
          )}
          keyExtractor={(detail: any, idx) => detail + idx}
          data={data}
        />
        // </>
      )}
    </SafeAreaView>
  );
}

export default SeedLibrary;
