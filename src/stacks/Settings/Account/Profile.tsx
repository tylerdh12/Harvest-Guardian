import axios from "axios";
import { default as React, useContext, useEffect, useState } from "react";
import {
  Alert,
  AsyncStorage,
  Button
} from "react-native";
import { BasicText, Label, View } from "../../../components/Styles";
import { AuthContext } from "../../../providers/AuthProvider";

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
        console.log(res.data)
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
          <Label>
            Full Name
          </Label>
          <BasicText
          style={{  fontSize: 22 }}
        >
          {user.first_name} {user.last_name}
        </BasicText>
        <Label>
            Email
        </Label>
        <BasicText
          style={{ fontSize: 20 }}
        >
          {user.email}
        </BasicText>
          <Label>
            Zip Code
          </Label>
          <BasicText>
            {user.zip_code}
          </BasicText>        
          <Label>
            Growing Zone
          </Label>
          <BasicText>
            {user.zone}
          </BasicText>
        </View>
        <View style={{marginBottom: 20}}>
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
