import React from "react";
import { SafeAreaView } from "./../components/Styles";

interface CenterProps {
  children: any;
}

export const Center: React.FC<CenterProps> = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </SafeAreaView>
  );
};
