import React from "react";
import { StyleSheet } from "react-native";
import { BottomBorderView, Text } from "./../components/Styles";

const styles = StyleSheet.create({
  borderBottom: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "darkgrey",
  },
  detailLabel: {
    width: "35%",
    textAlign: "left",
    paddingLeft: 12,
    fontSize: 15,
    fontWeight: "500",
  },
  dataDetails: {
    textAlign: "right",
    paddingRight: 12,
    width: "65%",
    fontSize: 15,
    fontWeight: "300",
  },
});

export const DetailListItem = (_props: any) => {
  return (
    <BottomBorderView style={styles.borderBottom}>
      <Text style={styles.detailLabel}>{_props.label}: </Text>
      <Text style={styles.dataDetails}>{_props.dataText}</Text>
    </BottomBorderView>
  );
};
