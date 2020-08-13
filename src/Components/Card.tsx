import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import styled from "styled-components";
import { RightAction, ViewAlt } from "./Styles";

interface CardProps {
  navigation: any;
  item: any;
  onLeftPress?: any;
  onRightPress?: any;
  children: any;
}

export const CardWrapper = styled.TouchableNativeFeedback`
  background: ${(props) => props.theme.background};
  justify-content: center;
  padding: 16px;
  border-radius: 30px;
`;

const styles = StyleSheet.create({
  wrapper: { justifyContent: "center", padding: 16, borderRadius: 30 },

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
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("Details", {
          data: item,
          type: "seed",
        })
      }
    >
      <View style={{ backgroundColor: "#dd2c00", borderRadius: 31 }}>
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
          <ViewAlt style={{ borderRadius: 31 }}>{children}</ViewAlt>
        </Swipeable>
      </View>
    </TouchableNativeFeedback>
  </View>
);
