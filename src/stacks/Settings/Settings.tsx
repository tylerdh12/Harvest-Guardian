import { default as React, useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Container } from "./../../components/Styles";
import Profile from "./Account/Profile";

function Settings({ navigation }) {
  const { logout, userData } = useContext(AuthContext);

  return (
    <Container>
      <Profile navigation={navigation} />
      {/*<TouchableOpacity
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
        <LinkTitle>Logout</LinkTitle>
      </TouchableOpacity>*/}
    </Container>
  );
}

export default Settings;
