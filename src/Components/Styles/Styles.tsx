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
  borderBottom: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 4,
  },
  detailLabel: {
    width: "35%",
    textAlign: "left",
    paddingLeft: 12,
    fontSize: 15,
    fontWeight: "500",
  },
  dataDetails: {
    textAlign: "right",
    paddingRight: 12,
    width: "65%",
    fontSize: 15,
    fontWeight: "300",
  },
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
  img: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  zoneHeading: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 8,
  },
  zoneBody: {
    textAlign: "center",
    fontWeight: "400",
    padding: 4,
    marginTop: 8,
  },
});