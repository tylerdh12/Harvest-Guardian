import { Ionicons } from "@expo/vector-icons";
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
  rightAction: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
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
          <Ionicons name="ios-trash" size={70} />
        </Animated.Text>
      </ViewAlt>
    </TouchableOpacity>
  );
};

export const Card: React.FC<CardProps> = ({
  navigation,
  item,
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
    style={{ backgroundColor: "#dd2c00" }}
  >
    <Swipeable
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
      {children}
    </Swipeable>
  </CardWrapper>
);
