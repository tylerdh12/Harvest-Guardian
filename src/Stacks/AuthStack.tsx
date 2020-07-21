import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { encode } from "base-64";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthNavProps, AuthParamList } from "../ParamLists/AuthParamList";
import { Center } from "../StyledContainers/Center";
interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [user, setUser] = useState(null);

  const onSubmit = async (username, password) => {
    (() => {
      setLoading(true);
      setError({});

      const token = encode(`${username}:${password}`);
      const auth = "Basic " + token;

      axios({
        method: "get",
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
        headers: {
          Authorization: auth,
        },
      })
        .then((res) => setUser(res.data))
        .catch((err) => setError(err.response))
        .then(() => {
          setLoading(false)
          navigation.navigate("Settings");
        });
    })();
  };

  return (
    <Center>
      <Text style={styles.heading1}>Login</Text>

      <Text
        style={
          error.status === 401
            ? {
                color: "#721c24",
                backgroundColor: "#f8d7da",
                padding: 10,
                borderRadius: 5,
                margin: 5,
              }
            : {
                backgroundColor: "rgba(0, 0, 0, .0)",
                padding: 10,
                margin: 5,
              }
        }
      >
        {error.status === 401 ? "Username or Password Incorrect" : ` `}
      </Text>

      <Text style={styles.inputLabel}>Email</Text>

      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        autoFocus={true}
        onChangeText={(e) => changeUsername(e)}
        value={username}
      />
      <Text style={styles.inputLabel}>Password</Text>

      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(p) => changePassword(p)}
        value={password}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonSpacing}
          disabled={isLoading}
          onPress={() => {
            onSubmit(username, password);
          }}
        >
          {isLoading ? (
            <Text style={styles.buttonText}>Logging In...</Text>
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
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
  const [zipCode, changeZipCode] = React.useState("");
  const [Email, changeEmail] = React.useState("");
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
      <Text style={styles.inputLabel}>Zip Code</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="number-pad"
        onChangeText={(zipCode) => changeZipCode(zipCode)}
        value={zipCode}
      />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        onChangeText={(Email) => changeEmail(Email)}
        value={Email}
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
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
    marginBottom: 10,
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
