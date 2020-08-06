import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { default as React, useContext, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import ModalWindow from "../components/ModalWindow";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../themes";
import { ErrorText, Text, TextInput } from "./../components/Styles";

const Stack = createStackNavigator();

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: ${(props) => props.theme.text};
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

const LinkTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

function Settings({ navigation }) {
  const { logout, userData } = useContext(AuthContext);

  return (
    <Container>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-person" size={22} />
          {"  "}
          Profile
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Preferences");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-options" size={22} />
          {"  "}Preferences
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Privacy");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-lock" size={22} />
          {"  "}Privacy
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-information-circle-outline" size={22} />
          {"  "}About
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          logout();
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-power" size={22} />
          {"  "}Logout
        </LinkTitle>
      </TouchableOpacity>
    </Container>
  );
}

function Profile({ navigation }) {
  const { logout, userData } = useContext(AuthContext);
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

  function SubmitHandler() {
    password === retypePassword
      ? changeUserData()
      : setError("Passwords Don't Match");
  }

  return (
    <Container>
      <View style={{ alignItems: "center", textAlign: "center" }}>
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
      </View>
    </Container>
  );
}

function Preferences({ navigation }: any) {
  const theme = useTheme();

  return (
    <Container>
      <View style={{ width: "70%" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <Label>Light / Dark Mode:</Label>
            <Switch
              // trackColor={{ false: "#767577", true: "#81b0ff" }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
              value={theme.mode === "dark"}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

function Privacy({ navigation }: any) {
  return (
    <Container>
      <View
        style={{
          width: "85%",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Harvest Guardian takes you security and privacy very serious. We vow
            to never sell or use any data you provide for anything besides the
            use of your data within this application.
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            The data you provide is stored in a database but is secure. We will
            keep you updated if for any reason any of that information becomes
            available. We seek the keep trust of our users at all cost. Even if
            that turns out to be the loss of users. We strive to be completely
            transparent.
          </Text>
        </View>
      </View>
    </Container>
  );
}

function About({ navigation }: any) {
  return (
    <Container>
      <View style={{ width: "70%" }}>
        <BasicText>
          Harvest Guardian is an application that hopes to help you gardening
          experience by helping you keep track of your plants and by helping
          provide knowledge and tips for a greener more bountiful garden.
        </BasicText>
      </View>
      <View
        style={{
          width: "80%",
          borderWidth: 1,
          borderColor: "lightgrey",
          marginTop: 30,
          marginBottom: 30,
        }}
      ></View>
      <View style={{ width: "70%" }}>
        <BasicText>
          Please view the github repo to request changes and features.
        </BasicText>
      </View>
    </Container>
  );
}

export const SettingsStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
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
        name="Profile"
        component={Profile}
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
        name="Preferences"
        component={Preferences}
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
        name="Privacy"
        component={Privacy}
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
        component={About}
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
