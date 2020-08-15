import React from "react";
import { Image, StyleSheet } from "react-native";

interface CardImageProps {
  image: any;
}

export const CardImage: React.FunctionComponent<CardImageProps> = ({
  image,
}) => {
  return (
    <Image
      source={{
        uri: `${image}`,
      }}
      style={styles.img}
    />
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
