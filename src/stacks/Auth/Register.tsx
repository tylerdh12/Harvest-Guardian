/* -------------------------------------------------------------------------- */
/* ----------------------------- Register Screen ---------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { Picker } from "@react-native-community/picker";
import axios from "axios";
import React, { useState } from "react";
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
  const [firstNameError, changeFirstNameError] = useState("");
  const [lastName, changeLastName] = useState("");
  const [lastNameError, changeLastNameError] = useState("");
  const [zipCode, changeZipCode] = useState("");
  const [zipCodeError, changeZipCodeError] = useState("");
  const [zone, setZone] = useState("");
  const [email, changeEmail] = useState("");
  const [emailError, changeEmailError] = useState("");
  const [password, changePassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [reenterpassword, changeReenterPassword] = useState("");
  const [reenterpasswordError, changeReenterPasswordError] = useState("");

  async function RegisterUser() {
    if (password === reenterpassword) {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        zip_code: zipCode,
        email: email,
        password: password,
        zone: zone,
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

  function getGrowingZoneWithZip(zipCode) {
    axios({
      method: "GET",
      url: `https://phzmapi.org/${zipCode}.json`,
    }).then((res) => {
      if (res.status === 200) {
        setZone(res.data.zone);
      } else {
        console.log(res);
      }
    });
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
              autoCompleteType="postal-code"
              keyboardType="number-pad"
              maxLength={5}
              textContentType="postalCode"
              onChangeText={(zipCode) => {
                changeZipCode(zipCode);
                if (zipCode.length === 5) {
                  getGrowingZoneWithZip(zipCode);
                }
              }}
              value={zipCode}
            />
          </View>
          <View style={{ width: "70%" }}>
            <Label>Email</Label>
            <TextInput
              autoCompleteType="email"
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
          <View style={{ width: "70%", alignItems: "center", height: 250 }}>
            <Label>Growing Zone</Label>
            <Picker
              itemStyle={{ color: "white" }}
              selectedValue={zone}
              style={{ height: 30, width: 100 }}
              onValueChange={(itemValue, itemIndex) => setZone(itemValue)}
            >
              <Picker.Item label="1a" value="1a" />
              <Picker.Item label="1b" value="1b" />
              <Picker.Item label="2a" value="2a" />
              <Picker.Item label="2b" value="2b" />
              <Picker.Item label="3a" value="3a" />
              <Picker.Item label="3b" value="3b" />
              <Picker.Item label="4a" value="4a" />
              <Picker.Item label="4b" value="4b" />
              <Picker.Item label="5a" value="5a" />
              <Picker.Item label="5b" value="5b" />
              <Picker.Item label="6a" value="6a" />
              <Picker.Item label="6b" value="6b" />
              <Picker.Item label="7a" value="7a" />
              <Picker.Item label="7b" value="7b" />
              <Picker.Item label="8a" value="8a" />
              <Picker.Item label="8b" value="8b" />
              <Picker.Item label="9a" value="9a" />
              <Picker.Item label="9b" value="9b" />
              <Picker.Item label="10a" value="10a" />
              <Picker.Item label="10b" value="10b" />
              <Picker.Item label="11a" value="11a" />
              <Picker.Item label="11b" value="11b" />
              <Picker.Item label="12a" value="12a" />
              <Picker.Item label="12b" value="12b" />
              <Picker.Item label="13a" value="13a" />
              <Picker.Item label="13b" value="13b" />
            </Picker>
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
