import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Center } from "../components/Center";
import { AuthContext } from "../providers/AuthProvider";

const Stack = createStackNavigator();

function Settings({ navigation }) {
  const { logout, userData } = useContext(AuthContext);

  return (
    <Center>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-person" size={22} />
          {"  "}
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("Security");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-key" size={22} />
          {"  "}Security
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("Notifications");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-notifications" size={22} />
          {"  "}Notifications
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("Preferences");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-options" size={22} />
          {"  "}Preferences
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("Privacy");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-lock" size={22} />
          {"  "}Privacy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-information-circle-outline" size={22} />
          {"  "}About
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableLinks}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.linkTitle}>
          <Ionicons name="ios-power" size={22} />
          {"  "}Logout
        </Text>
      </TouchableOpacity>
    </Center>
  );
}

function Profile({ navigation }) {
  const { userData } = useContext(AuthContext);

  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ alignItems: "center", textAlign: "center" }}>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "500" }}>Name: </Text>
          <Text>
            {userData.first_name} {userData.last_name}
          </Text>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "500" }}>Username: </Text>
          <Text>{userData.email}</Text>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "500" }}>Zip Code: </Text>
          <Text>{userData.zip_code}</Text>
        </View>
        <View style={{ padding: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "500" }}>Growing Zone: </Text>
          <Text>{userData.zone}</Text>
        </View>
      </View>
    </View>
  );
}

function Security({ navigation }) {
  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ width: "70%" }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Security</Text>
      </View>
    </View>
  );
}

function Notifications({ navigation }: any) {
  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ width: "70%" }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Notifications</Text>
      </View>
    </View>
  );
}

function Preferences({ navigation }: any) {
  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ width: "70%" }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Preferences</Text>
      </View>
    </View>
  );
}

function Privacy({ navigation }: any) {
  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ width: "70%" }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Privacy</Text>
      </View>
    </View>
  );
}

function About({ navigation }: any) {
  return (
    <View style={{ alignItems: "center", paddingTop: 30 }}>
      <View style={{ width: "70%" }}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Harvest Guardian is an application that hopes to help you gardening
          experience by helping you keep track of your plants and by helping
          provide knowledge and tips for a greener more bountiful garden.
        </Text>
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
        <Text style={{ textAlign: "center", fontSize: 16 }}>
          Please view the github repo to request changes and features.
        </Text>
      </View>
    </View>
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
        name="Notifications"
        component={Notifications}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingTop: 5,
    justifyContent: "center",
    marginTop: 15,
  },
  touchableLinks: {
    padding: 5,
  },
  linkTitle: {
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontWeight: "500",
  },
});
