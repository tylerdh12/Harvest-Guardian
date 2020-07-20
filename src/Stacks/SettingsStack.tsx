import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SettingsParamList } from "../ParamLists/SettingsParamList";
import { AuthContext } from "../Providers/AuthProvider";
import { Center } from "../StyledContainers/Center";

interface SettingsStackProps {}

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
  const { authBasic, user } = useContext(AuthContext);

  return (
    <Center>
      <Text>Profile</Text>
      <View style={{ padding: 10, flexDirection: "row" }}>
        <Text style={{ fontWeight: "500" }}>Username: </Text>
        <Text>{authBasic.username.toLowerCase()}</Text>
      </View>
      <View style={{ padding: 10, flexDirection: "row" }}>
        <Text style={{ fontWeight: "500" }}>Zip Code: </Text>
        <Text>{user.zip_code}</Text>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
        }}
      >
        <Button
          title="Delete Account"
          color="red"
          onPress={() => {
            alert("Delete Button Pressed");
          }}
        />
      </View>
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

export const SettingsStack: React.FC<SettingsStackProps> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#fff",
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
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
          },
          headerRight: () => (
            <Button
              title="Edit"
              onPress={() => {
                alert("Edit Profile Button pressed");
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          headerStyle: {
            backgroundColor: "rgb(148, 224, 136)",
          },
          headerTintColor: "#fff",
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
          headerTintColor: "#fff",
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
          headerTintColor: "#fff",
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
          headerTintColor: "#fff",
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
          headerTintColor: "#fff",
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
