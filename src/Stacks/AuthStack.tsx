/* -------------------------------------------------------------------------- */
/*                            Authentication Stack                           */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { encode } from "base-64";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Alert, AsyncStorage } from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import {
  Button,
  ErrorText,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "./../components/Styles";

/* ------------------------------ Define Stack ------------------------------ */

const Stack = createStackNavigator();

/* --------------------------- Login Stack Reducer -------------------------- */

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
        isLoggedIn: false,
        error: "",
      };
    }
    case "logout": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: {},
        error: "",
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
        error: action.message,
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

/* ---------------------- Primary Login Function Stack ---------------------- */

function Login({ navigation }) {
  /* -- Import useContext from Auth Context to Use login() and Error Reports -- */

  const { login, errorMessage, setErrorMessage } = useContext(AuthContext);

  /* ------------------- Reducer Variables to Control State ------------------- */

  const [
    { username, password, isLoading, error, user, isLoggedIn },
    dispatch,
  ] = useReducer(loginReducer, {
    username: "",
    password: "",
    isLoading: false,
    error: "",
    user: {},
    authBasic: "",
    isLoggedIn: false,
  });

  /* --------- useEffect Calls Auto Login if authBasic in AsyncStorage -------- */

  useEffect(() => {
    AsyncStorage.getItem("userData").then((userData) => {
      if (userData !== null) {
        try {
          AsyncStorage.getItem("authBasic").then((authBasic) => {
            login(authBasic);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  /* ------- Primary Login Function Handler requires username, password ------- */

  async function loginWithUserPass(username, password) {
    dispatch({ type: "login" });
    const token = encode(`${username}:${password}`);
    const authBasic = "Basic " + token;
    try {
      await AsyncStorage.setItem("authBasic", authBasic);
    } catch (error) {
      console.log(error);
    }

    await login(authBasic);

    AsyncStorage.getItem("userData").then((userData) => {
      if (userData === null) {
        dispatch({ type: "error", message: "Invalid Email or Password" });
      }
    });
  }

  /* ------------------------- Return for Login Stack ------------------------- */

  return (
    <SafeAreaView>
      <Text style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>
        Login
      </Text>

      {error !== "" ? (
        <Text
          style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            padding: 10,
            borderRadius: 5,
            margin: 10,
          }}
        >
          {error}
        </Text>
      ) : null}

      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>Email</Text>

      <TextInput
        keyboardType="email-address"
        autoFocus={true}
        onChangeText={(e) =>
          dispatch({ type: "field", field: "username", value: e })
        }
        value={username}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Password
      </Text>

      <TextInput
        secureTextEntry={true}
        onChangeText={(e) =>
          dispatch({ type: "field", field: "password", value: e })
        }
        value={password}
      />
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ margin: 10 }}
          disabled={isLoading}
          onPress={() => {
            loginWithUserPass(username, password);
          }}
        >
          {isLoading ? (
            <Text
              style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
            >
              Logging In...
            </Text>
          ) : (
            <Text
              style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
            >
              Log In
            </Text>
          )}
        </Button>
        <Button
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
          >
            Don't have an account?
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );

  /* --------------------------- End of Login Stack --------------------------- */
}

/* ----------------------------- Register Stack ----------------------------- */

function Register({ navigation }) {
  const [firstName, changeFirstName] = useState("");
  const [lastName, changeLastName] = useState("");
  const [zipCode, changeZipCode] = useState("");
  const [email, changeEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, changePassword] = useState("");
  const [reenterpassword, changeReenterPassword] = useState("");

  async function RegisterUser() {
    if (password === reenterpassword) {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        zip_code: zipCode,
        email: email,
        password: password,
        account_type: "user",
        active: true,
      };

      axios({
        method: "post",
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/plants",

        data: newUser,
      }).then((res) => {
        if (res.status === 401) {
          console.log("Response 401");
          console.log(res);
        } else if (res.status === 201) {
          Alert.alert(
            "User Created",
            "Login?",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          navigation.navigate("Login");
        } else {
          console.log(res);
        }
      });

      console.log(newUser);
    } else {
      setPasswordError("Passwords Don't Match");
    }
  }

  return (
    <SafeAreaView>
      <Text style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>
        Create a New Account
      </Text>
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        First Name
      </Text>
      <TextInput
        autoFocus={true}
        onChangeText={(firstName) => changeFirstName(firstName)}
        value={firstName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Last Name
      </Text>
      <TextInput
        onChangeText={(lastName) => changeLastName(lastName)}
        value={lastName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Zip Code
      </Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(zipCode) => changeZipCode(zipCode)}
        value={zipCode}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>Email</Text>
      <TextInput
        keyboardType="email-address"
        onChangeText={(email) => changeEmail(email)}
        value={email}
      />
      {passwordError !== "" ? (
        <ErrorText style={{ padding: 10 }}>{passwordError}</ErrorText>
      ) : null}
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Password
      </Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(password) => changePassword(password)}
        value={password}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Re-enter Password
      </Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(reenterPassword) =>
          changeReenterPassword(reenterPassword)
        }
        value={reenterpassword}
      />
      <Stack.Screen name="Login" component={Login} />
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          style={{ margin: 10 }}
          onPress={() => {
            RegisterUser();
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
          >
            Register
          </Text>
        </Button>
        <Button
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}
          >
            Already have an account?
          </Text>
        </Button>
      </View>
    </SafeAreaView>
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
