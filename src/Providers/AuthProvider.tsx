import axios from "axios";
import { encode } from "base-64";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";

type User = null | { username: string };
type AuthBasic = null | string;

export const AuthContext = React.createContext<{
  user: User;
  authBasic: AuthBasic;
  login: (username, password) => void;
  logout: () => void;
}>({
  authBasic: null,
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [authBasic, setAuthBasic] = useState<AuthBasic>(null);

  async function getUserData(authBasic) {
    await axios({
      method: "get",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
      headers: {
        Authorization: authBasic,
      },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authBasic,
        login: (username, password) => {
          const token = encode(`${username}:${password}`);
          const authBasic = "Basic " + token;
          setAuthBasic(authBasic);
          getUserData(authBasic);
          AsyncStorage.setItem("auth", JSON.stringify(authBasic));
        },
        logout: () => {
          setUser(null);
          AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
