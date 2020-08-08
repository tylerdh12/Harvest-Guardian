import { default as React } from "react";
import { Switch, View } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../../themes";

const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.background};
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const Label = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;
const BasicText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-right: 18px;
  color: ${(props) => props.theme.text};
`;

const LinkTitle = styled.Text`
  text-align: center;
  font-size: 20px;
  padding: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

function Preferences({ navigation }: any) {
  const theme = useTheme();

  return (
    <Container>
      <View style={{ width: "70%" }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
          >
            <Label>Light / Dark Mode:</Label>
            <Switch
              // trackColor={{ false: "#767577", true: "#81b0ff" }}
              // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              // ios_backgroundColor="#3e3e3e"
              onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
              value={theme.mode === "dark"}
            />
          </View>
        </View>
      </View>
    </Container>
  );
}

export default Preferences;
