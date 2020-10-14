import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { AppTabs } from "./AppTabs";
import Loader from "./components/LoadingScreens/Loader";
import { SafeAreaView } from "./components/Styles";
import { AuthContext } from "./providers/AuthProvider";
import { AuthStack } from "./stacks/Auth/AuthStack";

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
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {userData ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
