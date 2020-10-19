import React, { useState } from "react";
import Input from "../../../components/Input";
import { Container, TextInput, Label } from "../../../components/Styles";

interface CreateSeedProps {
  species: string;
  variety: string;
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
}

export const CreateSeed: React.FC<CreateSeedProps> = ({}) => {

  const [species, changeSpecies] = useState("");

  return (
    <Container>
      <Input 
        title="Species"
        type="none"
        maxLength={30}
        completeType="off"
        keyboard="default"
      />
    </Container>
  );
};




// {
//   byproducts: [],
//   companions:  [],
//   complete: false,
//   days_to_germinate: "",
//   days_to_harvest: "",
//   depth: "",
//   description: "",
//   height: "",
//   images: [
//     "",
//   ],
//   non_companions: [
//     "",
//   ],
//   nutrient: [
//     "",
//   ],
//   public: true,
//   soil_temp_high: ,
//   soil_temp_low: ,
//   sow_indoor: "",
//   sow_outdoor: "",
//   spacing: "",
//   species: "",
//   starter_age: "",
//   sun: "",
//   variety: "",
//   water: "",
//   zone: {
//     "_10a": [],
//     "_10b": [],
//     "_11a": [],
//     "_11b": [],
//     "_12a": [],
//     "_12b": [],
//     "_13a": [],
//     "_13b": [],
//     "_1a": [],
//     "_1b": [],
//     "_2a": [],
//     "_2b": [],
//     "_3a": [],
//     "_3b": [],
//     "_4a": [],
//     "_4b": [],
//     "_5a": [],
//     "_5b": [],
//     "_6a": [],
//     "_6b": [],
//     "_7a": [],
//     "_7b": [],
//     "_8a": [],
//     "_8b": [],
//     "_9a": [],
//     "_9b": [],
//   }