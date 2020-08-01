import React from "react";
import styled from "styled-components/native";

interface CenterProps {
  children: any;
}

const ThemedSafeAreaView = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background};
  width: 100%;
  height: 100%;
`;

export const Center: React.FC<CenterProps> = ({ children }) => {
  return <ThemedSafeAreaView>{children}</ThemedSafeAreaView>;
};
