import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RightAction, ViewAlt } from "../Styles";

interface CardProps {
  navigation: any;
  item: any;
  onLeftPress?: any;
  onRightPress?: any;
  children: any;
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,

    backgroundColor: "#dd2c00",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    padding: 20,
  },
});

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <RightAction>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          <Ionicons name="ios-trash" size={70} />
        </Animated.Text>
      </RightAction>
    </TouchableOpacity>
  );
};

export const Card: React.FC<CardProps> = ({
  navigation,
  item,
  onRightPress,
  children,
}) => (
  <View style={styles.wrapper}>
    <Swipeable
      z-index={10}
      friction={2}
      overshootLeft={false}
      overshootRight={false}
      rightThreshold={50}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}
    >
      <ViewAlt
        style={{
          borderRadius: 30,
          backgroundColor: "transparent",
        }}
      >
        {children}
      </ViewAlt>
    </Swipeable>
  </View>
);
