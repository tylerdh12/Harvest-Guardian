import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { LeftAction } from "../Styles";

interface LeftActionAddProps {
  progress: any;
  dragX: any;
}

export const LeftActionAdd: React.FunctionComponent<LeftActionAddProps> = ({
  progress,
  dragX,
}) => {
  console.log(progress);
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0.75],
    extrapolate: "identity",
  });

  return (
    <TouchableOpacity style={{ width: 100 }}>
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
