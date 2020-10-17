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

export async function getPlants(setData, setLoading) {
  await AsyncStorage.getItem("authBasic").then((authBasic) => {
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

export async function addPlantAlert({ data, navigation }) {
  // const [date, setDate] = useState("");
  Alert.alert(
    "Is this a seed or starter",
    `A start adds the plant past the germination stage.`,
    [
      {
        text: "Planting a Seed",
        onPress: () => {
          AddSeedToMyGarden({
            data,
            date_planted: new Date(),
            navigation,
          });

          console.log("Seed Pressed");
        },
      },
      {
        text: "Planting a Starter",
        onPress: () => {
          console.log("Starter Pressed")
          var dt = new Date();
          dt.setDate( dt.getDate() - parseInt(data.starter_age) )
          console.log(dt)
          AddSeedToMyGarden({
            data,
            date_planted: dt,
            navigation,
          })
          
          console.log("Starter Pressed");
        }
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
    ],
    { cancelable: true }
  );

  // return (
  //   <View>
  //     <TextInput
  //       style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
  //       onChangeText={(text) => setDate(text)}
  //       value={date}
  //     />
  //   </View>
  // );
}

export const AddSeedToMyGarden = async ({date_planted, data, navigation }) => {
  await AsyncStorage.getItem("authBasic").then((authBasic) => {
    axios({
      method: "post",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",
      headers: {
        Authorization: authBasic,
      },
      data: {
        _id: data._id,
        date_planted: date_planted
      },
    }).then((res) => {
      if (res.status === 401) {
        console.log("Response 401");
        console.log(res);
      } else {
        navigation.navigate("MyGarden", {
          setRefresh: true,
        });
      }
    });
  });
};

export async function deletePlantAlert({ data, onRefresh }) {
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

export async function deletePlantFromMyGarden({ data, onRefresh }) {
  await AsyncStorage.getItem("authBasic").then((authBasic) => {
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
          ? onRefresh()
          : alert("Error Deleting Plant");
      }
    });
  });
}
