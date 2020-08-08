import { default as React } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../components/Styles";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

function Privacy({ navigation }: any) {
  return (
    <Container>
      <View
        style={{
          width: "85%",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Harvest Guardian takes you security and privacy very serious. We vow
            to never sell or use any data you provide for anything besides the
            use of your data within this application.
          </Text>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            The data you provide is stored in a database but is secure. We will
            keep you updated if for any reason any of that information becomes
            available. We seek the keep trust of our users at all cost. Even if
            that turns out to be the loss of users. We strive to be completely
            transparent.
          </Text>
        </View>
      </View>
    </Container>
  );
}

export default Privacy;
