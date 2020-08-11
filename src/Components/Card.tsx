import React from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { CardBody, CardWrapper, Text, ViewAlt } from "./Styles";

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

export const Card = ({ navigation, item, onLeftPress, onRightPress }) => (
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
      <Image
        source={{
          uri: `${item.images}`,
        }}
        style={{
          width: "100%",
          height: 160,
          borderRadius: 30,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <CardBody>
        <ViewAlt style={{ flexDirection: "row" }}>
          <ViewAlt style={{ width: "50%" }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {item.species}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              {item.variety}
            </Text>
          </ViewAlt>
          <ViewAlt style={{ width: "50%" }}>
            <Text
              style={{
                textAlign: "right",
                marginTop: 8,
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              Harvest in {item.days_to_harvest}
            </Text>
          </ViewAlt>
        </ViewAlt>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "500",
            padding: 6,
            marginTop: 8,
          }}
        >
          {item.zone._8b.join(", ")}
        </Text>
      </CardBody>
    </Swipeable>
  </CardWrapper>
);
