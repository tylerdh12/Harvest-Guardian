import { createStackNavigator } from "@react-navigation/stack";
import { encode } from "base-64";
import React, { useContext, useEffect, useReducer } from "react";
import { AsyncStorage, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../Providers/AuthProvider";
import { Center } from "../StyledContainers/Center";

function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: [],
      };
    }
    case "logout": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: [],
        error: [],
        username: "",
        password: "",
      };
    }
    case "success": {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "error": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    }
    case "alreadyAuth": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        authData: action.username,
      };
    }
    default:
      break;
  }
  return state;
}

const Stack = createStackNavigator();

function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const [
    { username, password, isLoading, error, user, isLoggedIn },
    dispatch,
  ] = useReducer(loginReducer, {
    username: "",
    password: "",
    isLoading: false,
    error: [],
    user: {},
    authBasic: "",
    isLoggedIn: false,
  });

  useEffect(() => {
    AsyncStorage.getItem("authBasic")
      .then((authBasic) => {
        if (authBasic) {
          //decode is
          login(authBasic);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function loginWithUserPass(username, password) {
    const token = encode(`${username}:${password}`);
    const authBasic = "Basic " + token;
    await AsyncStorage.setItem("authBasic", authBasic).then(() => {
      login(authBasic);
    });
  }

  return (
    <Center>
      <Text style={styles.heading1}>Login</Text>

      {error === 401 ? (
        <Text
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            padding: 10,
            borderRadius: 5,
            margin: 10,
          }}
        >
          Username or Password Incorrect
        </Text>
      ) : null}

      <Text style={styles.inputLabel}>Email</Text>

      <TextInput
        style={styles.textInput}
        keyboardType="email-address"
        autoFocus={true}
        onChangeText={(e) =>
          dispatch({ type: "field", field: "username", value: e })
        }
        value={username}
      />
      <Text style={styles.inputLabel}>Password</Text>

      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(e) =>
          dispatch({ type: "field", field: "password", value: e })
        }
        value={password}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonSpacing}
          disabled={isLoading}
          onPress={() => {
            loginWithUserPass(username, password);
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

function Register({ navigation }) {
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

export const AuthStack = ({}) => {
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
