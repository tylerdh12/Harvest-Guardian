import axios from "axios";
import { default as React, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Button,
  View,
} from "react-native";
import styled from "styled-components/native";
import ModalWindow from "../../components/ModalWindow";
import { ErrorText, Text, TextInput } from "../../components/Styles";
import { AuthContext } from "../../providers/AuthProvider";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;
const BasicText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  color: ${(props) => props.theme.text};
`;

function Profile({ navigation }) {
  const { logout, userData } = useContext<any>(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, changePassword] = useState("");
  const [retypePassword, changeRetypePassword] = useState("");

  function changeUserData() {
    setIsLoading(true);
    AsyncStorage.getItem("authBasic").then((authBasic) => {
      axios({
        method: "patch",
        url: `https://harvestguardian-rest-api.herokuapp.com/v1/user/${userData._id}`,
        headers: {
          Authorization: authBasic,
        },
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: password,
          zip_code: userData.zip_code,
          account_type: userData.account_type,
          zone: userData.zone,
          active: true,
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

  function SubmitHandler() {
    password === retypePassword
      ? changeUserData()
      : setError("Passwords Don't Match");
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
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Label>Name: </Label>
          <BasicText>
            {userData.first_name} {userData.last_name}
          </BasicText>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Label>Username: </Label>
          <BasicText>{userData.email}</BasicText>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Label>Zip Code: </Label>
          <BasicText>{userData.zip_code}</BasicText>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Label>Growing Zone: </Label>
          <BasicText>{userData.zone}</BasicText>
        </View>
        <ModalWindow title="Change Password" size={18} space={15} color="red">
          {isLoading ? (
            <View style={{ padding: 25 }}>
              <Text style={{ marginBottom: 5, textAlign: "center" }}>
                Changing Password
              </Text>
              <Text style={{ marginBottom: 25, textAlign: "center" }}>
                Please Wait...
              </Text>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <>
              <Text
                style={{
                  padding: 4,
                  fontWeight: "400",
                  fontSize: 16,
                  marginTop: 20,
                }}
              >
                Password
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 5,
                  marginBottom: 10,
                  width: "60%",
                  maxWidth: 300,
                }}
                secureTextEntry={true}
                onChangeText={(password) => changePassword(password)}
                value={password}
              />
              <Text
                style={{
                  padding: 4,
                  fontWeight: "400",
                  fontSize: 16,
                }}
              >
                Retype Password
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 5,
                  padding: 5,
                  marginBottom: 10,
                  width: "60%",
                  maxWidth: 300,
                }}
                secureTextEntry={true}
                onChangeText={(password) => changeRetypePassword(password)}
                value={retypePassword}
              />
              {error !== "" ? <ErrorText>{error}</ErrorText> : null}
              <Button
                title="Change Password"
                onPress={SubmitHandler}
                color="green"
                accessibilityLabel="Submit a new password"
              />
            </>
          )}
        </ModalWindow>
        <Button
          title="Delete Account"
          color="red"
          onPress={() => {
            DeleteUserAlert();
          }}
        />
      </View>
    </Container>
  );
}

export default Profile;
