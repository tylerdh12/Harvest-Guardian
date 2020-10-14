import axios from "axios";
import { default as React, useContext, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  View
} from "react-native";
import { BasicText, Container, Label } from "../../../components/Styles";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = ({ navigation }) => {
  const {
    logout,
    userData,
    authBasic,
    setUserData,
    setErrorMessage,
  } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, changePassword] = useState("");
  const [rawPassword, setRawPassword] = useState("");
  const [retypePassword, changeRetypePassword] = useState("");
  const [zone, changeZone] = useState(userData.zone);

  useEffect(() => {
    // AsyncStorage.getItem("rawLogin").then((response) =>
    //   response?.length > 0 ? setRawPassword(response) : console.log("noData")
    // );
    // axios({
    //   method: "get",
    //   url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
    //   headers: {
    //     Authorization: authBasic,
    //   },
    // })
    //   .then((res) => {
    //     setUserData(res.data);
    //     console.log(res.data.email + " has Logged on");
    //     AsyncStorage.setItem("userData", JSON.stringify(res.data));
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       setErrorMessage(err.response.status);
    //     }
    //   });
  }, []);

  const DeleteUserAlert = () => {
    Alert.alert(
      "Delete Account?",
      "Are you sure you want to cancel your account?",
      [
        {
          text: "Yes",
          style: "destructive",
          onPress: () => DeleteUserAccount(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  function DeleteUserAccount() {
    setIsLoading(true);
    AsyncStorage.getItem("authBasic").then((authBasic) => {
      axios({
        method: "delete",
        url: `https://harvestguardian-rest-api.herokuapp.com/v1/user/${userData._id}`,
        headers: {
          Authorization: authBasic,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            console.log("Response 401");
            console.log(res);
          } else if (res.status === 500) {
            console.log("Response Error 500");
            console.log(res);
          } else {
            logout();
          }
        })
        .then(() => setIsLoading(false));
    });
  }

  return (
    <Container style={{ alignItems: "center" }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          flexDirection: "column",
        }}
      >
        <BasicText
          style={{ margin: 8, padding: 10, textAlign: "center", fontSize: 22 }}
        >
          {userData.first_name} {userData.last_name}
        </BasicText>

        <BasicText
          style={{ margin: 8, padding: 10, textAlign: "center", fontSize: 20 }}
        >
          {userData.email}
        </BasicText>
        <View style={{ margin: 6, padding: 10, flexDirection: "row" }}>
          <Label style={{ fontSize: 18, margin: 0, padding: 5 }}>
            Zip Code:{" "}
          </Label>
          <BasicText style={{ fontSize: 18, margin: 0, padding: 5 }}>
            {userData.zip_code}
          </BasicText>
        </View>
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Label style={{ fontSize: 18, margin: 0, padding: 5 }}>
            Growing Zone:{" "}
          </Label>
          <BasicText style={{ fontSize: 18, margin: 0, padding: 5 }}>
            {userData.zone}
          </BasicText>
        </View>
        <Button
          title="Delete Account"
          color="red"
          onPress={() => {
            DeleteUserAlert();
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>
    </Container>
  );
};

export default Profile;
