import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { TextInput, View, Text, ScrollView, ButtonPrimary, ButtonPrimaryText, KeyboardAvoidingView, SafeAreaView } from "../../../components/Styles";
import { AddSeedToLibrary } from "../../../utils/Utils";


export default function CreateSeed() {

  // For setting the Loading state of the Submit Button
  const [isLoading, setIsLoading] = useState(false)

  // The Complete list of Form Data collected as an Object
  const [formData, updateFormData] = useState({})

  // Each individual Form element State
  const [species, updateSpecies] = useState("")
  const [days_to_harvest, updateDaysToHarvest] = useState("")
  const [days_to_germinate, updateDaysToGerminate] = useState("")
  const [starter_age, updateStarterAge] = useState("")
  const [depth, updateDepth] = useState("")
  const [spacing, updateSpacing] = useState("")

  // Used for syncing state for each input after input value change (ASYNC)
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
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>* Species:</Text>
          <TextInput value={species} onChangeText={(text: React.SetStateAction<string>) => updateSpecies(text)} />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>* Days to Harvest: (days)</Text>
          <TextInput value={days_to_harvest} onChangeText={(text: React.SetStateAction<string>) => updateDaysToHarvest(text)} keyboardType="numeric" />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>Days to Germinate: (days)</Text>
          <TextInput value={days_to_germinate} onChangeText={(text: React.SetStateAction<string>) => updateDaysToGerminate(text)} keyboardType="numeric" />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>Starter Age: (days)</Text>
          <TextInput value={starter_age} onChangeText={(text: React.SetStateAction<string>) => updateStarterAge(text)} keyboardType="numeric" />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>Depth: (cm)</Text>
          <TextInput value={depth} onChangeText={(text: React.SetStateAction<string>) => updateDepth(text)} keyboardType="numeric" />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <Text style={{ padding: 6 }}>Spacing: (cm)</Text>
          <TextInput value={spacing} onChangeText={(text: React.SetStateAction<string>) => updateSpacing(text)} keyboardType="numeric" />
        </View>
        <View style={{ alignItems: 'center', width: "100%", marginTop: 4 }}>
          <ButtonPrimary style={{ marginTop: 20 }}
            onPress={() => {
              AddSeedToLibrary({ data: formData, setIsLoading })
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

  //    species: req.body.species,
	// 		variety: req.body.variety,
	// 		description: req.body.description,
	// 		days_to_germinate: req.body.days_to_germinate,
	// 		days_to_harvest: req.body.days_to_harvest,
	// 		companions: req.body.companions,
	// 		non_companions: req.body.non_companions,
	// 		sun: req.body.sun,
	// 		water: req.body.water,
	// 		nutrient: req.body.nutrient,
	// 		sow_indoor: req.body.sow_indoor,
	// 		sow_outdoor: req.body.sow_outdoor,
	// 		stitch: req.body.stitch,
	// 		depth: req.body.depth,
	// 		spacing: req.body.spacing,
	// 		height: req.body.height,
	// 		soil_temp_high: req.body.soil_temp_high,
	// 		soil_temp_low: req.body.soil_temp_low,
	// 		byproducts: req.body.byproducts,
	// 		brand: req.body.brand,
	// 		sku: req.body.sku,
	// 		images: req.body.images,
	// 		complete: req.body.complete,
	// 		public: req.body.public,
	// 		zone: {
	// 			_1a: req.body.zone._1a,
	// 			_1b: req.body.zone._1b,
	// 			_2a: req.body.zone._2a,
	// 			_2b: req.body.zone._2b,
	// 			_3a: req.body.zone._3a,
	// 			_3b: req.body.zone._3b,
	// 			_4a: req.body.zone._4a,
	// 			_4b: req.body.zone._4b,
	// 			_5a: req.body.zone._5a,
	// 			_5b: req.body.zone._5b,
	// 			_6a: req.body.zone._6a,
	// 			_6b: req.body.zone._6b,
	// 			_7a: req.body.zone._7a,
	// 			_7b: req.body.zone._7b,
	// 			_8a: req.body.zone._8a,
	// 			_8b: req.body.zone._8b,
	// 			_9a: req.body.zone._9a,
	// 			_9b: req.body.zone._9b,
	// 			_10a: req.body.zone._10a,
	// 			_10b: req.body.zone._10b,
	// 			_11a: req.body.zone._11a,
	// 			_11b: req.body.zone._11b,
	// 			_12a: req.body.zone._12a,
	// 			_12b: req.body.zone._12b,
	// 			_13a: req.body.zone._13a,
	// 			_13b: req.body.zone._13b,
	// 		}