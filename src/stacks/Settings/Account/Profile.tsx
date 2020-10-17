import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { default as React, useContext, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Button
} from "react-native";
import { BasicText, Label, TouchableOpacityAlt, View } from "../../../components/Styles";
import { AuthContext } from "../../../providers/AuthProvider";
import { ChangePassword } from "./ChangePassword";
import { ChangeZone } from "./ChangeZone";

interface ProfileProps {
  navigation: () => void;
  userData?: {
  __v: number
  _id: string;
  account_type: string;
  active: boolean;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  zip_code: number;
  zone: string;
  }
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const {
    logout,
    userData,
    authBasic,
    // setUserData,
    setErrorMessage,
  } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(userData)

  useEffect(() =>{
    setIsLoading(true);
    axios({
      method: "get",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
      headers: {
        Authorization: authBasic,
      },
    })
      .then((res) => {
        if(res.status === 200) {
        setUser(res.data)
        console.log(res.data.email + " has fetched user data");
        // AsyncStorage.setItem("userData", JSON.stringify(res.data));
        setIsLoading(false);
      }else{console.log("Error Fetching User Data")}
      })
      .catch((err) => {
        if (err) {
          setErrorMessage(err.message);
          console.log(err)
        }
      });
  }, [userData]);

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
        url: `https://harvestguardian-rest-api.herokuapp.com/v1/user/${user._id}`,
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
          width: '100%',
          flex: 1,
          flexDirection: "column",
          justifyContent: 'space-between'
        }}>
          <View style={{ marginBottom: 20}}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
              <Label>
                Full Name
              </Label>
<TouchableOpacityAlt onPress={() => {console.log("Edit Name Button Pressed")}}><Feather style={{paddingRight: 20}} name="edit-3" size={22} color="white" /></TouchableOpacityAlt>
            </View>
            <BasicText
            style={{  fontSize: 22 }}
          >
            {user.first_name} {user.last_name}
          </BasicText>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
              <Label>
                  Email
              </Label>
<TouchableOpacityAlt onPress={() => {console.log("Edit Email Button Pressed")}}><Feather style={{paddingRight: 20}} name="edit-3" size={22} color="white" /></TouchableOpacityAlt>
            </View>
          <BasicText
            style={{ fontSize: 20 }}
          >
            {user.email}
          </BasicText>
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
              <Label>
                  Zip Code
              </Label>
<TouchableOpacityAlt onPress={() => {console.log("Edit Zip Code Button Pressed")}}><Feather style={{paddingRight: 20}} name="edit-3" size={22} color="white" /></TouchableOpacityAlt>
            </View>
          <BasicText>
            {user.zip_code}
          </BasicText>        
          <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: 'center'}}>
              <Label>
                  Growing Zone
              </Label>
<TouchableOpacityAlt onPress={() => {navigation.navigate("ChangeZone")}}><Feather style={{paddingRight: 20}} name="edit-3" size={22} color="white" /></TouchableOpacityAlt>
            </View>
          <BasicText>
            {user.zone}
          </BasicText>
        </View>
        <View style={{marginBottom: 20}}>
        <Button
          title="Change Password"
          onPress={() => {
          navigation.navigate("ChangePassword")
        }}
        />
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
        /></View>
      </View>
  );
};

export default Profile;




const Stack = createStackNavigator();

export const ProfileStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={ChangePassword}
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name="About"
        component={ChangeZone}
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#403D3D",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
        }}
      />
    </Stack.Navigator>
  );
};
