import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  addPlantButton: {
    position: "absolute",
    backgroundColor: "rgb(148, 224, 136)",
    padding: 0,
    top: 20,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  iconWrapper: {
    backgroundColor: "transparent",
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "relative",
  },
  addIcon: { position: "absolute", top: 25, left: 27 },
  plantIcon: {
    position: "absolute",
    top: 10,
    left: 8,
  },
  headerImage: { width: "100%", height: 300 },
  contentWrapperContainer: {
    paddingTop: 25,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
  },
});