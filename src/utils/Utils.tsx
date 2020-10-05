import axios from "axios";
import React from "react";
import { Alert, AsyncStorage } from "react-native";

interface UtilsProps {
  setData?: any;
  setLoading?: any;
  setRefreshing?: any;
  data?: any;
  navigation?: any;
}

export const Utils: React.FC<UtilsProps> = ({}) => {
  return null;
};

export function getPlants(setData, setLoading) {
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

export const AddSeedToMyGarden = ({ data, navigation }) => {
  AsyncStorage.getItem("authBasic").then((authBasic) => {
    axios({
      method: "post",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",
      headers: {
        Authorization: authBasic,
      },
      data: data,
    }).then((res) => {
      if (res.status === 401) {
        console.log("Response 401");
        console.log(res);
      } else {
        Alert.alert(
          "Seed Planted",
          `${data.species} has been added to My Garden`,
          [
            {
              text: "OK",
              onPress: () => {
                console.log("OK Pressed");
                navigation.navigate("MyGarden", {
                  setRefresh: true,
                });
              },
            },
          ],
          { cancelable: false }
        );
      }
    });
  });
};

export function deletePlantAlert({ data, onRefresh }) {
  Alert.alert(
    "Are you sure?",
    `Would you still like to remove ${data.seed.species} ${data.seed.variety} from My Garden`,
    [
      {
        text: "Yes - Remove Please",
        onPress: async () =>
          deletePlantFromMyGarden({
            data,
            onRefresh,
          }),
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

export function deletePlantFromMyGarden({ data, onRefresh }) {
  AsyncStorage.getItem("authBasic").then((authBasic) => {
    axios({
      method: "delete",
      url: `https://harvestguardian-rest-api.herokuapp.com/v1/plants/${data._id}`,
      headers: {
        Authorization: authBasic,
      },
    }).then((res) => {
      if (res.status === 401) {
        console.log("Response 401");
        console.log(res);
      } else if (res.status === 200) {
        res.data.deletedCount === 1
          ? Alert.alert("Plant Has Been Removed", "", [
              {
                text: "Ok",
                onPress: () => {
                  onRefresh();
                },
              },
            ])
          : alert("Error Deleting Plant");
      }
    });
  });
}
