import React, { useState } from "react";
import { Button } from "react-native";
import { Label, SafeAreaView, TextInput } from "../../components/Styles";

function Create({ route, navigation }) {
  const [species, updateSpecies] = useState("");
  const [variety, updateVariety] = useState("");
  const [isLoading, updateIsLoading] = useState("");
  const [error, updateError] = useState("");

  return (
    <SafeAreaView>
      <Label>Species:</Label>
      <TextInput onChangeText={(text) => updateSpecies(text)} value={species} />
      <Label>Vairety:</Label>
      <TextInput onChangeText={(text) => updateVariety(text)} value={variety} />
      <Button
        onPress={() => {
          console.log("submit button pressed");
        }}
        title="Submit"
      />
    </SafeAreaView>
  );
}

export default Create;
