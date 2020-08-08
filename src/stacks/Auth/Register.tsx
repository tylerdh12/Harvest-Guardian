/* -------------------------------------------------------------------------- */
/* ----------------------------- Register Screen ---------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  Button,
  ErrorText,
  SafeAreaView,
  Text,
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
      <Text style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>
        Create a New Account
      </Text>
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        First Name
      </Text>
      <TextInput
        autoFocus={true}
        onChangeText={(firstName) => changeFirstName(firstName)}
        value={firstName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Last Name
      </Text>
      <TextInput
        onChangeText={(lastName) => changeLastName(lastName)}
        value={lastName}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Zip Code
      </Text>
      <TextInput
        keyboardType="number-pad"
        onChangeText={(zipCode) => changeZipCode(zipCode)}
        value={zipCode}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>Email</Text>
      <TextInput
        keyboardType="email-address"
        onChangeText={(email) => changeEmail(email)}
        value={email}
      />
      {passwordError !== "" ? (
        <ErrorText style={{ padding: 10 }}>{passwordError}</ErrorText>
      ) : null}
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Password
      </Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(password) => changePassword(password)}
        value={password}
      />
      <Text style={{ padding: 4, fontWeight: "400", fontSize: 16 }}>
        Re-enter Password
      </Text>
      <TextInput
        secureTextEntry={true}
        onChangeText={(reenterPassword) =>
          changeReenterPassword(reenterPassword)
        }
        value={reenterpassword}
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
          onPress={() => {
            RegisterUser();
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
      </View>
    </SafeAreaView>
  );
}

export default Register;
