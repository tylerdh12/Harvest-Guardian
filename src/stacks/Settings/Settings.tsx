import { Ionicons } from "@expo/vector-icons";
import { default as React, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../providers/AuthProvider";
import { Container, LinkTitle } from "./../../components/Styles";

function Settings({ navigation }) {
  const { logout, userData } = useContext(AuthContext);

  return (
    <Container>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-person" size={22} />
          {"  "}
          Profile
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Preferences");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-options" size={22} />
          {"  "}Preferences
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Privacy");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-lock" size={22} />
          {"  "}Privacy
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-information-circle-outline" size={22} />
          {"  "}About
        </LinkTitle>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 5 }}
        onPress={() => {
          logout();
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-power" size={22} />
          {"  "}Logout
        </LinkTitle>
      </TouchableOpacity>
    </Container>
  );
}

export default Settings;
