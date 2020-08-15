import styled from "styled-components/native";

/* -------------------- Standard React Native Components -------------------- */

/* ---------------------------------- Text ---------------------------------- */

export const Heading = styled.Text`
  color: ${(props) => props.theme.text};
  font-size: 26px;
  font-weight: 700;
  padding-top: 30px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.text};
`;

export const ErrorText = styled.Text`
  color: ${(props) => props.theme.errorText};
  padding: 10px;
  font-size: 16px;
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

export const ButtonPrimary = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.buttonPrimary};
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  margin: 10px;
  border-radius: 8px;
`;

export const ButtonPrimaryText = styled.Text`
  color: ${(props) => props.theme.buttonPrimaryText};
  font-weight: 700;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.buttonBackground};
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  margin: 10px;
  border-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.buttonText};
  font-weight: 700;
  font-size: 16px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  background: ${(props) => props.theme.backgroundAlt};
`;

/* ------------------------- Custom Card Components ------------------------- */

export const CardWrapper = styled.TouchableHighlight`
  background: ${(props) => props.theme.background};
  justify-content: center;
  padding: 16px;
  border-radius: 30px;
`;

export const CardBody = styled.View`
  background: ${(props) => props.theme.backgroundAlt};
  padding: 30px;
  border-radius: 30px;
  margin-top: -30px;
`;

/* -------------------------- Custom Form Elements -------------------------- */

export const Label = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: center;
  padding: 10px;
  font-weight: 500;
  font-size: 16px;
`;

export const LabelLeft = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: left;
  padding-bottom: 10px;
  padding-top: 10px;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
`;

export const TextInput = styled.TextInput`
  border-color: ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};
  border-width: 2px;
  border-radius: 10px;
  height: 45px;
  padding: 5px;
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
`;

/* ----------------------------- Card Containers ---------------------------- */

export const RightAction = styled.View`
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background: #dd2c00;
  justify-content: center;
  flex: 1;
  align-items: flex-end;
  margin-left: -30px;
  padding-left: 30px;
`;

export const LeftAction = styled.View`
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background: #388e3c;
  justify-content: center;
  flex: 1;
  align-items: flex-end;
  margin-right: -30px;
  padding-right: 30px;
`;

/* ------------------------------ Settings Page ----------------------------- */

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

export const MenuLabel = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;
export const BasicText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  color: ${(props) => props.theme.text};
`;

export const LinkTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;
