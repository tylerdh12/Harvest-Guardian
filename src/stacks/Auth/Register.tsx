/* -------------------------------------------------------------------------- */
/* ----------------------------- Register Screen ---------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  Button,
  ButtonPrimary,
  ButtonPrimaryText,
  ButtonText,
  ErrorText,
  Heading,
  Label,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from "../../components/Styles";

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
        url: "https://harvestguardian-rest-api.herokuapp.com/v1/user",

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
      <Heading>Create a New Account</Heading>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: "70%" }}>
            <Label>First Name</Label>
            <TextInput
              autoFocus={true}
              onChangeText={(firstName) => changeFirstName(firstName)}
              value={firstName}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Label>Last Name</Label>
            <TextInput
              onChangeText={(lastName) => changeLastName(lastName)}
              value={lastName}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Label>Zip Code</Label>
            <TextInput
              keyboardType="number-pad"
              onChangeText={(zipCode) => changeZipCode(zipCode)}
              value={zipCode}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Label>Email</Label>
            <TextInput
              keyboardType="email-address"
              onChangeText={(email) => changeEmail(email)}
              value={email}
            />
          </View>
          <View style={{ width: "70%" }}>
            {passwordError !== "" ? (
              <ErrorText style={{ padding: 10 }}>{passwordError}</ErrorText>
            ) : null}
            <Label>Password</Label>
            <TextInput
              secureTextEntry={true}
              onChangeText={(password) => changePassword(password)}
              value={password}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Label>Re-enter Password</Label>
            <TextInput
              secureTextEntry={true}
              onChangeText={(reenterPassword) =>
                changeReenterPassword(reenterPassword)
              }
              value={reenterpassword}
            />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <ButtonPrimary
          style={{ margin: 10 }}
          onPress={() => {
            RegisterUser();
          }}
        >
          <ButtonPrimaryText>Register</ButtonPrimaryText>
        </ButtonPrimary>
        <Button
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <ButtonText>Already have an account?</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Register;
