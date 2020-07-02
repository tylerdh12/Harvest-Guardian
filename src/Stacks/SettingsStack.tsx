import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SettingsParamList } from "../ParamLists/SettingsParamList";
import { AuthContext } from "../Providers/AuthProvider";
import { Center } from "../StyledContainers/Center";

interface SettingsStackProps { }

const Stack = createStackNavigator<SettingsParamList>();

function Settings({ navigation }: any) {
  const { logout } = useContext(AuthContext);

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

function Profile({ navigation }: any) {
  return (
    <Center>
      <Text>Profile</Text>
    </Center>
  );
}

function Security({ navigation }: any) {
  return (
    <Center>
      <Text>Security</Text>
    </Center>
  );
}

function Notifications({ navigation }: any) {
  return (
    <Center>
      <Text>Notifications</Text>
    </Center>
  );
}

function Preferences({ navigation }: any) {
  return (
    <Center>
      <Text>Preferences</Text>
    </Center>
  );
}

function Privacy({ navigation }: any) {
  return (
    <Center>
      <Text>Privacy</Text>
    </Center>
  );
}

function About({ navigation }: any) {
  return (
    <Center>
      <Text>About</Text>
    </Center>
  );
}

export const SettingsStack: React.FC<SettingsStackProps> = ({ }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Privacy" component={Privacy} />
      <Stack.Screen name="About" component={About} />
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
