import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { default as React, useContext } from "react";
import { Switch, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import ModalWindow from "../components/ModalWindow";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../themes";

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
          navigation.navigate("Security");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-key" size={22} />
          {"  "}Security
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
  const { userData } = useContext(AuthContext);

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
        <ModalWindow title="Change Password" notify={["One", "Two"]} />
      </View>
    </Container>
  );
}

function Security({ navigation }) {
  return (
    <Container>
      <Title>Security</Title>
    </Container>
  );
}

function Preferences({ navigation }: any) {
  const theme = useTheme();

  return (
    <Container>
      <View style={{ width: "70%" }}>
        <Title>Preferences</Title>
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
      <Title>Privacy</Title>
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
        name="Security"
        component={Security}
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
