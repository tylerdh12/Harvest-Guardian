import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardWrapper, ViewAlt } from "./Styles";

interface CardProps {
  navigation: any;
  item: any;
  onLeftPress?: any;
  onRightPress?: any;
  children: any;
}

const styles = StyleSheet.create({
  leftAction: {
    borderRadius: 30,
    backgroundColor: "#388e3c",
    justifyContent: "center",
    flex: 1,
  },
  rightAction: {
    borderRadius: 30,
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    padding: 20,
  },
});

const LeftActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <ViewAlt style={styles.leftAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Add To Garden
        </Animated.Text>
      </ViewAlt>
    </TouchableOpacity>
  );
};

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <ViewAlt style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </ViewAlt>
    </TouchableOpacity>
  );
};

export const Card: React.FC<CardProps> = ({
  navigation,
  item,
  onLeftPress,
  onRightPress,
  children,
}) => (
  <CardWrapper
    onPress={() =>
      navigation.navigate("Details", {
        data: item,
        type: "seed",
      })
    }
  >
    <Swipeable
      renderLeftActions={(progress, dragX) => (
        <LeftActions progress={progress} dragX={dragX} onPress={onLeftPress} />
      )}
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}
    >
      {children}
    </Swipeable>
  </CardWrapper>
);
