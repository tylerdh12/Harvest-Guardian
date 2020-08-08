import styled from "styled-components/native";

/* -------------------- Standard React Native Components -------------------- */

/* ---------------------------------- Text ---------------------------------- */

export const Text = styled.Text`
  color: ${(props) => props.theme.text};
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.errorText};
`;

/* ----------------------------- View Components ---------------------------- */

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const View = styled.View`
  background: ${(props) => props.theme.background};
`;

export const ViewAlt = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
`;

export const CenterView = styled.View`
  background: ${(props) => props.theme.background};
`;

export const CenterViewAlt = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
`;

export const ScrollView = styled.ScrollView`
  background: ${(props) => props.theme.background};
`;

/* ---------------------------- Style Components ---------------------------- */

export const BottomBorderView = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
  border-bottom-color: ${(props) => props.theme.border};
`;

export const Button = styled.TouchableOpacity`
  background: ${(props) => props.theme.buttonBackgroundAlt};
`;

export const ButtonPrimary = styled.TouchableOpacity`
  background: ${(props) => props.theme.buttonBackground};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  background: ${(props) => props.theme.backgroundAlt};
`;

/* ------------------------- Custom Card Components ------------------------- */

export const CardWrapper = styled.TouchableOpacity`
  background: ${(props) => props.theme.backgroundAlt};
  justify-content: center;
  margin: 12px;
  border-radius: 30px;
  box-shadow: 2px 3px 2px #000;
`;

export const CardBody = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
  padding: 30px;
  border-radius: 30px;
  margin-top: -30px;
  box-shadow: 0px 0px 6px #000;
`;

/* -------------------------- Custom Form Elements -------------------------- */

export const Label = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: left;
  padding: 8px;
  font-weight: 400;
  font-size: 16px;
`;

export const TextInput = styled.TextInput`
  border-color: ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  border-width: 2px;
  border-radius: 5px;
  height: 40px;
  padding: 5px;
  margin-bottom: 10px;
  width: 60%;
  max-width: 300px;
`;
