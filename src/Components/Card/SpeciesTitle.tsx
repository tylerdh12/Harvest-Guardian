import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "../../components/Styles";

interface Props {
  species: Text;
}

const SpeciesTitle = ({ species }: Props) => {
  return <Text style={styles.cardTitle}>{species}</Text>;
};

export default SpeciesTitle;

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
