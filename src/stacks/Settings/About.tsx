import { default as React } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const BasicText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  color: ${(props) => props.theme.text};
`;

function About({ navigation }: any) {
  return (
    <Container>
      <View style={{ width: "70%" }}>
        <BasicText>
          Harvest Guardian is an application that hopes to help your gardening
          experience by helping you keep track of your plants and by helping
          provide knowledge and tips for a greener more bountiful garden.
        </BasicText>
      </View>
      <View
        style={{
          width: "80%",
          borderWidth: 1,
          borderColor: "lightgrey",
          marginTop: 30,
          marginBottom: 30,
        }}
      ></View>
      <View style={{ width: "70%" }}>
        <BasicText>
          Please view the github repo to request changes and features.
        </BasicText>
      </View>
    </Container>
  );
}

export default About;
