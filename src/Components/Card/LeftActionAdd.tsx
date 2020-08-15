import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { LeftAction } from "../Styles";

interface LeftActionAddProps {
  progress: any;
  dragX: any;
  onPress: any;
}

export const LeftActionAdd: React.FunctionComponent<LeftActionAddProps> = ({
  progress,
  dragX,
  onPress,
}) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity style={{ width: 80 }} onPress={onPress}>
      <LeftAction>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Ionicons name="ios-add-circle" size={70} />
        </Animated.Text>
      </LeftAction>
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
