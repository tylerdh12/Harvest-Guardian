import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { TextInput, View, Text, ScrollView, ButtonPrimary, ButtonPrimaryText, KeyboardAvoidingView, SafeAreaView } from "../../../components/Styles";
import { AddSeedToLibrary } from "../../../utils/Utils";


export default function CreateSeed() {

  const [isLoading, setIsLoading] = useState(false)

  const [formData, updateFormData] = useState({})

  const [species, updateSpecies] = useState("")
  const [days_to_harvest, updateDaysToHarvest] = useState("")
  const [days_to_germinate, updateDaysToGerminate] = useState("")
  const [starter_age, updateStarterAge] = useState("")
  const [depth, updateDepth] = useState("")
  const [spacing, updateSpacing] = useState("")

  useEffect(() => {
    (async () => (
      await updateFormData({
        species, days_to_harvest, days_to_germinate, starter_age, depth, spacing
      })
    ))();
  }, [species, days_to_harvest, days_to_germinate, starter_age, depth, spacing])

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
>
      <ScrollView>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>* Species:</Text>
        <TextInput value={species} onChangeText={(text: React.SetStateAction<string>) => updateSpecies(text)} />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>* Days to Harvest: (days)</Text>
        <TextInput value={days_to_harvest} onChangeText={(text: React.SetStateAction<string>) => updateDaysToHarvest(text)} keyboardType="numeric" />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>Days to Germinate: (days)</Text>
        <TextInput value={days_to_germinate} onChangeText={(text: React.SetStateAction<string>) => updateDaysToGerminate(text)} keyboardType="numeric" />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>Starter Age: (days)</Text>
        <TextInput value={starter_age} onChangeText={(text: React.SetStateAction<string>) => updateStarterAge(text)} keyboardType="numeric" />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>Depth: (cm)</Text>
        <TextInput value={depth} onChangeText={(text: React.SetStateAction<string>) => updateDepth(text)} keyboardType="numeric" />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <Text style={{padding: 6}}>Spacing: (cm)</Text>
        <TextInput value={spacing} onChangeText={(text: React.SetStateAction<string>) => updateSpacing(text)} keyboardType="numeric" />
      </View>
      <View style={{alignItems: 'center', width: "100%", marginTop: 4}}>
        <ButtonPrimary style={{marginTop: 20}}
        onPress={()=> {
          AddSeedToLibrary({data: formData, setIsLoading})
        }}
        >
          {isLoading ?
          (<ButtonPrimaryText>Adding Seed...</ButtonPrimaryText>)
          : (<ButtonPrimaryText>Submit</ButtonPrimaryText>) 
          }
        </ButtonPrimary>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* NOTE - Data Structure 
  species: string;
  description: string;
  days_to_germinate: string;
  days_to_harvest: string;
  starter_age: string;
  depth: string;
  height: string;
  images: [string];
  companions:  [string];
  non_companions: [string];
  byproducts: [string];
  nutrient: [string];
  soil_temp_high: number;
  soil_temp_low: number;
  sow_indoor: string;
  sow_outdoor: string;
  spacing: string;
  sun: string;
  water: string;
  zone: {
    "_1a": [string];
    "_1b": [string];
    "_2a": [string];
    "_2b": [string];
    "_3a": [string];
    "_3b": [string];
    "_4a": [string];
    "_4b": [string];
    "_5a": [string];
    "_5b": [string];
    "_6a": [string];
    "_6b": [string];
    "_7a": [string];
    "_7b": [string];
    "_8a": [string];
    "_8b": [string];
    "_9a": [string];
    "_9b": [string];
    "_10a": [string];
    "_10b": [string];
    "_11a": [string];
    "_11b": [string];
    "_12a": [string];
    "_12b": [string];
    "_13a": [string];
    "_13b": [string];
  }
  public: boolean;
  complete: boolean;
  */