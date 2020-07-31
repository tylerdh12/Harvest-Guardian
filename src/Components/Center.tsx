import React from "react";
import { SafeAreaView } from "react-native";

interface CenterProps {}

export const Center: React.FC<CenterProps> = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </SafeAreaView>
  );
};
