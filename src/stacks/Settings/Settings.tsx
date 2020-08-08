import { Ionicons } from "@expo/vector-icons";
import { default as React, useContext } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AuthContext } from "../../providers/AuthProvider";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;
const BasicText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  color: ${(props) => props.theme.text};
`;

const LinkTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

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
