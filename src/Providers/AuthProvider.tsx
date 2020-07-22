import axios from "axios";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = React.createContext({
  authBasic: null,
  userData: null,
  login: (authBasic) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
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
        AsyncStorage.setItem("userData", JSON.stringify(res.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <AuthContext.Provider
      value={{
        authBasic,
        userData,
        login: (authBasic) => {
          return getUserData(authBasic);
        },
        logout: () => {
          setUserData(null);
          AsyncStorage.removeItem("authBasic");
          AsyncStorage.removeItem("userData");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
