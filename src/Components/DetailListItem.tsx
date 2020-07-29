import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DetailListItem = (_props) => {
  return (
    <View style={styles.detailItemContainer}>
      <Text style={styles.labelText}>{_props.label}: </Text>
      <Text style={styles.dataText}>{_props.dataText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailItemContainer: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    backgroundColor: "#403D3D",
    borderBottomWidth: 4,
    borderBottomColor: "#323030",
  },
  labelText: {
    width: "35%",
    textAlign: "left",
    paddingLeft: 12,
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  dataText: {
    textAlign: "right",
    paddingRight: 12,
    width: "65%",
    color: "white",
    fontSize: 15,
    fontWeight: "300",
  },
});

export default DetailListItem;
