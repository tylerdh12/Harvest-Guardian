/* -------------------------------------------------------------------------- */
/*                            Authentication Stack                           */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { createStackNavigator } from "@react-navigation/stack";
import { encode } from "base-64";
import React, { useContext, useEffect, useReducer } from "react";
import { AsyncStorage, StyleSheet, TextInput } from "react-native";
import { Center } from "../components/Center";
import { AuthContext } from "../providers/AuthProvider";
import { Button, Text, View } from "./../components/Styles";

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
    <Center>
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
    </Center>
  );

  /* --------------------------- End of Login Stack --------------------------- */
}

/* ----------------------------- Register Stack ----------------------------- */

function Register({ navigation }) {
  const [firstName, changeFirstName] = React.useState("");
  const [lastName, changeLastName] = React.useState("");
  const [zipCode, changeZipCode] = React.useState("");
  const [Email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");
  const [reenterpassword, changeReenterPassword] = React.useState("");

  return (
    <Center>
      <Text style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>
        Create a New Account
      </Text>
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        First Name
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
        autoFocus={true}
        onChangeText={(firstName) => changeFirstName(firstName)}
        value={firstName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Last Name
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
        onChangeText={(lastName) => changeLastName(lastName)}
        value={lastName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Zip Code
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
        keyboardType="number-pad"
        onChangeText={(zipCode) => changeZipCode(zipCode)}
        value={zipCode}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>Email</Text>
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
        keyboardType="email-address"
        onChangeText={(Email) => changeEmail(Email)}
        value={Email}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
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
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Re-enter Password
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
        onChangeText={(reenterPassword) =>
          changeReenterPassword(reenterPassword)
        }
        value={reenterpassword}
      />
      <Stack.Screen name="Login" component={Login} />
      <ViewAlt
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
            alert("User has been Registered");
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
      </ViewAlt>
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
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
