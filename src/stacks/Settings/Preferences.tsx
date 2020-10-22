import { default as React } from "react";
import { Switch, View } from "react-native";
import { Container, Label } from "../../components/Styles";
import { useTheme } from "../../themes";

function Preferences() {
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
