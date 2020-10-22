import { default as React } from "react";
import { BasicText, Container, View, Text } from "../../components/Styles";

function About() {
  return (
    <Container> 
      <View style={{ width: "70%" }}>
        <Text style={{textAlign: 'center'}}>
          Harvest Guardian is an application that hopes to help your gardening
          experience by helping you keep track of your plants and by helping
          provide knowledge and tips for a greener more bountiful garden.
        </Text>
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
        <Text style={{textAlign: 'center'}}>
          Please view the github repo to request changes and features.
        </Text>
      </View>
    </Container>
  );
}

export default About;
