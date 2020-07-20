import axios from "axios";
import { encode } from "base-64";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";

type User = null | { username: string };

export const AuthContext = React.createContext<{
  user: User;
  authBasic: (username, password) => void;
  login: (username, password) => void;
  logout: () => void;
}>({
  authBasic: {
    username: null,
    password: null,
  },
  user: null,
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [authBasic, setAuthBasic] = useState<AuthBasic>(null);

  async function getUserData(User) {
    setAuthBasic(User);
    const token = encode(`${User.username}:${User.password}`);
    const auth = "Basic " + token;

    await axios({
      method: "get",
      url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",
      headers: {
        Authorization: auth,
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
          const User = {
            username,
            password,
          };
          getUserData(User);
          AsyncStorage.setItem("user", JSON.stringify(User));
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
