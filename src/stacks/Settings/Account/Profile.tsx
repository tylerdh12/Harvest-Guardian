import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { default as React, useContext, useEffect, useState } from "react";
import { Alert, AsyncStorage, Button } from "react-native";
import {
  BasicText,
  Label,
  TouchableOpacityAlt,
  View,
} from "../../../components/Styles";
import { AuthContext } from "../../../providers/AuthProvider";

interface ProfileProps {
  userData?: {
    __v: number;
    _id: string;
    account_type: string;
    active: boolean;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    zip_code: number;
    zone: string;
  };
  navigation: any;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const {
    logout,
    userData,
    authBasic,
    setUserData,
    setErrorMessage,
  } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    navigation.addListener("focus", () => {
      setIsLoading(true);
      axios({
        method: "get",
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
        headers: {
          Authorization: authBasic,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setUserData(res.data);
            console.log(res.data.email + " has fetched user data");
            // AsyncStorage.setItem("userData", JSON.stringify(res.data));
            setIsLoading(false);
          } else {
            console.log("Error Fetching User Data");
          }
        })
        .catch((err) => {
          if (err) {
            setErrorMessage(err.message);
            console.log(err);
          }
        });
    });
  }, [navigation]);

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
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>Full Name</Label>
        </View>
        <BasicText>
          {userData.first_name} {userData.last_name}
        </BasicText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>Email</Label>
        </View>
        <BasicText>{userData.email}</BasicText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>Zip Code</Label>
          <TouchableOpacityAlt
            onPress={() => {
              navigation.push("Change Zip Code");
            }}
          >
            <Feather
              style={{ paddingRight: 20 }}
              name="edit-3"
              size={22}
              color="white"
            />
          </TouchableOpacityAlt>
        </View>
        <BasicText>{userData.zip_code}</BasicText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Label>Growing Zone</Label>
          <TouchableOpacityAlt
            onPress={() => {
              navigation.push("Change Zone");
            }}
          >
            <Feather
              style={{ paddingRight: 20 }}
              name="edit-3"
              size={22}
              color="white"
            />
          </TouchableOpacityAlt>
        </View>
        <BasicText>{userData.zone}</BasicText>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Change Password"
          onPress={() => {
            navigation.push("Change Password");
          }}
        />
        <Button
          title="Delete Account"
          color="red"
          onPress={() => {
            DeleteUserAlert();
          }}
        />
      </View>
    </View>
  );
};

export default Profile;