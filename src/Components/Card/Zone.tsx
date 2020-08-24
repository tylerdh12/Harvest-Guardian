import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "./../Styles";

interface ZoneProps {
  item: any;
  zone: string;
}

export const Zone: React.FunctionComponent<ZoneProps> = ({ zone, item }) => {
  let key = "_" + zone.toString();
  return (
    <View>
      <Text style={styles.zoneHeading}>Zone {zone}</Text>
      <Text style={styles.zoneBody}>{item.zone[key].join(", ")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  zoneHeading: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 8,
  },
  zoneBody: {
    textAlign: "center",
    fontWeight: "400",
    padding: 4,
    marginTop: 8,
  },
});
