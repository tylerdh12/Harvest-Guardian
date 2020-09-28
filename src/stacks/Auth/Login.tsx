/* -------------------------------------------------------------------------- */
/* ------------------------------ Login Screen ------------------------------ */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { encode } from "base-64";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useReducer } from "react";
import { AsyncStorage } from "react-native";
import {
  Button,
  ButtonPrimary,
  ButtonPrimaryText,
  ButtonText,
  ErrorText,
  Heading,
  Label,
  SafeAreaView,
  TextInput,
  View,
} from "../../components/Styles";
import { AuthContext } from "../../providers/AuthProvider";

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

  const { login } = useContext(AuthContext);

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
      <StatusBar style="light" />
      <Heading>Login</Heading>

      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "70%" }}>
          <Label>Email</Label>

          <TextInput
            keyboardType="email-address"
            autoFocus={true}
            onChangeText={(e) =>
              dispatch({ type: "field", field: "username", value: e })
            }
            value={username}
          />
        </View>
        <View style={{ width: "70%" }}>
          <Label>Password</Label>

          <TextInput
            secureTextEntry={true}
            onChangeText={(e) =>
              dispatch({ type: "field", field: "password", value: e })
            }
            value={password}
          />
        </View>
        {error !== "" ? <ErrorText>{error}</ErrorText> : null}
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          margin: 15,
        }}
      >
        <ButtonPrimary
          disabled={isLoading}
          onPress={() => {
            loginWithUserPass(username, password);
          }}
        >
          {isLoading ? (
            <ButtonPrimaryText>Logging In...</ButtonPrimaryText>
          ) : (
            <ButtonPrimaryText>Log In</ButtonPrimaryText>
          )}
        </ButtonPrimary>
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <ButtonText>Don't have an account?</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );

  /* --------------------------- End of Login Stack --------------------------- */
}

export default Login;
