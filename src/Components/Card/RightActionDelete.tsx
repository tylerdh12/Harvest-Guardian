import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { RightAction } from "../../components/Styles";

interface RightActionDeleteProps {
  progress: any;
  dragX: any;
  onPress: any;
}

export const RightActionDelete: React.FunctionComponent<RightActionDeleteProps> = ({
  progress,
  dragX,
  onPress,
}) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity style={{ width: 80 }} onPress={onPress}>
      <RightAction>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Ionicons name="ios-trash" size={70} />
        </Animated.Text>
      </RightAction>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "#fff",
    fontWeight: "700",
    padding: 20,
  },
});
