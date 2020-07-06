import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthNavProps, AuthParamList } from "../ParamLists/AuthParamList";
import { AuthContext } from "../Providers/AuthProvider";
import { Center } from "../StyledContainers/Center";

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");

  return (
    <Center>
      <Text style={styles.heading1}>Login</Text>
      <Text style={styles.inputLabel}>Username</Text>

      <TextInput
        style={styles.textInput}
        autoFocus={true}
        onChangeText={(username) => changeUsername(username)}
        value={username}
      />
      <Text style={styles.inputLabel}>Password</Text>

      <TextInput
        style={styles.textInput}
        onChangeText={(password) => changePassword(password)}
        value={password}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonSpacing}
          onPress={() => {
            login();
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSpacing}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.buttonText}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </Center>
  );
}

function Register({ navigation }: AuthNavProps<"Register">) {
  const [firstName, changeFirstName] = React.useState("");
  const [lastName, changeLastName] = React.useState("");
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [reenterpassword, changeReenterPassword] = React.useState("");

  return (
    <Center>
      <Text style={styles.heading1}>Create a New Account</Text>
      <Text style={styles.inputLabel}>First Name</Text>
      <TextInput
        style={styles.textInput}
        autoFocus={true}
        onChangeText={(firstName) => changeFirstName(firstName)}
        value={firstName}
      />
      <Text style={styles.inputLabel}>Last Name</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(lastName) => changeLastName(lastName)}
        value={lastName}
      />
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(username) => changeUsername(username)}
        value={username}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(password) => changePassword(password)}
        value={password}
      />
      <Text style={styles.inputLabel}>Re-enter Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(reenterPassword) =>
          changeReenterPassword(reenterPassword)
        }
        value={reenterpassword}
      />
      <Stack.Screen name="Login" component={Login} />
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonSpacing}
          onPress={() => {
            alert("User has been Registered");
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSpacing}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{
          header: () => null,
        }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  heading1: {
    fontWeight: "700",
    fontSize: 22,
    marginBottom: 30,
  },
  inputLabel: {
    padding: 4,
    fontWeight: "400",
    fontSize: 16,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: "60%",
    maxWidth: 300,
  },
  buttonView: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  buttonSpacing: {
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
