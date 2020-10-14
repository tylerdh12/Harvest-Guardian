import axios from "axios";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";

interface AuthProviderProps {
  children: any;
  login?: (authBasic) => void;
  logout?: () => void;
  setErrorMessages?: string;
  userData?: Object;
  setUserData?: (userData) => void;
}

export const AuthContext = React.createContext({
  authBasic: null,
  userData: null,
  errorMessage: "",
  setErrorMessage: "",
  login: (authBasic) => {},
  logout: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [authBasic, setAuthBasic] = useState(null);

  async function getUserData(authBasic) {
    setAuthBasic(authBasic);
    await axios({
      method: "get",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
      headers: {
        Authorization: authBasic,
      },
    })
      .then((res) => {
        setUserData(res.data);
        console.log(res.data.email + " has Logged on");
        AsyncStorage.setItem("userData", JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err) {
          setErrorMessage(err.response.status);
        }
      });
  }

  return (
    <AuthContext.Provider
      value={{
        authBasic,
        userData,
        errorMessage,
        setErrorMessage,
        login: (authBasic) => {
          return getUserData(authBasic);
        },
        logout: () => {
          console.log(userData.email + " Logged out");
          setUserData(null);
          AsyncStorage.removeItem("authBasic");
          AsyncStorage.removeItem("userData");
          AsyncStorage.removeItem("rawLogin");
          AsyncStorage.removeItem("EXPO_CONSTANTS_INSTALLATION_ID");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
