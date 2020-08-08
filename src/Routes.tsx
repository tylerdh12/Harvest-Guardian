import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, AsyncStorage } from "react-native";
import { AppTabs } from "./AppTabs";
import { AuthContext } from "./providers/AuthProvider";
import { AuthStack } from "./stacks/Auth/AuthStack";
import { Center } from "./components/Center";
import { SafeAreaView } from "./components/Styles";

interface RoutesProps {}

export const Routes = ({}) => {
  const { login, userData, authBasic } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("authBasic")
      .then((userString) => {
        if (userString) {
          //decode is
          login(authBasic);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {userData ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
