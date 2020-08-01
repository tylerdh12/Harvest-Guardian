import React from "react";
import { BottomBorderView, Text } from "./../components/Styles";

export const DetailListItem = (_props: any) => {
  return (
    <BottomBorderView
      style={{
        flexDirection: "row",
        paddingTop: 18,
        paddingBottom: 18,
        borderBottomWidth: 4,
      }}
    >
      <Text
        style={{
          width: "35%",
          textAlign: "left",
          paddingLeft: 12,
          fontSize: 15,
          fontWeight: "500",
        }}
      >
        {_props.label}:{" "}
      </Text>
      <Text
        style={{
          textAlign: "right",
          paddingRight: 12,
          width: "65%",
          fontSize: 15,
          fontWeight: "300",
        }}
      >
        {_props.dataText}
      </Text>
    </BottomBorderView>
  );
};

export default DetailListItem;
