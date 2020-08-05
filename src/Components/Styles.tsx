import styled from "styled-components/native";

/* -------------------- Standard React Native Components -------------------- */

export const Text = styled.Text`
  color: ${(props) => props.theme.text};
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.errorText};
`;

export const View = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
`;

export const ViewAlt = styled.View`
  background: ${(props) => props.theme.viewAlt};
`;

export const ScrollView = styled.ScrollView`
  background: ${(props) => props.theme.background};
`;

export const BottomBorderView = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
  border-bottom-color: ${(props) => props.theme.border};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  background: ${(props) => props.theme.backgroundAlt};
`;

export const TouchableOpacityButtonPrimary = styled.TouchableOpacity`
  background: ${(props) => props.theme.buttonBackground};
`;

export const TouchableOpacityButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.buttonBackgroundAlt};
`;

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background: ${(props) => props.theme.background};
`;

/* ------------------------- Custom Card Components ------------------------- */

export const StyledCardContainer = styled.TouchableOpacity`
  background: ${(props) => props.theme.backgroundAlt};
`;

export const StyledDetailsCardContainer = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
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
  border-width: 2px;
  border-radius: 5px;
  height: 40px;
  padding: 5px;
  margin-bottom: 10px;
  width: 60%;
  max-width: 300px;
`;
