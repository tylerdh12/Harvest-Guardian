import { Ionicons } from "@expo/vector-icons";
import { default as React, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Container, LinkTitle, TouchableOpacityAlt } from "./../../components/Styles";

function Settings({ navigation }) {
  const { logout, userData } = useContext(AuthContext);

  return (
    <Container>
      <TouchableOpacityAlt
        style={{ padding: 5 }}
        onPress={() => {
          navigation.push("Profile");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-person" size={22} />
          {"  "}
          Profile
        </LinkTitle>
      </TouchableOpacityAlt>
      <TouchableOpacityAlt
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Preferences");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-options" size={22} />
          {"  "}Preferences
        </LinkTitle>
      </TouchableOpacityAlt>
      <TouchableOpacityAlt
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("Privacy");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-lock" size={22} />
          {"  "}Privacy
        </LinkTitle>
      </TouchableOpacityAlt>
      <TouchableOpacityAlt
        style={{ padding: 5 }}
        onPress={() => {
          navigation.navigate("About");
        }}
      >
        <LinkTitle>
          <Ionicons name="ios-information-circle-outline" size={22} />
          {"  "}About
        </LinkTitle>
      </TouchableOpacityAlt> 
      <TouchableOpacityAlt
        style={{ padding: 5 }}
        onPress={() => {
          logout();
        }}
      >
        <LinkTitle>Logout</LinkTitle>
      </TouchableOpacityAlt>
    </Container>
  );
}

export default Settings;
