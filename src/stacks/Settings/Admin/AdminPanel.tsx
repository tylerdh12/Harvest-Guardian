import React from "react";
import {
  Container,
  Text,
  TouchableOpacity,
} from "./../../../components/Styles";

export const AdminPanel = ({ navigation }) => {
  return (
    <Container>
      <TouchableOpacity>
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Create Seed");
        }}
      >
        <Text>Create a New Seed</Text>
      </TouchableOpacity>
    </Container>
  );
};
