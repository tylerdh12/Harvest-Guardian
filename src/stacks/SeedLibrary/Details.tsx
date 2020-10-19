import { FontAwesome5 } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { DetailListItem } from "../../components/DetailListItem";
import { ScrollView, TouchableOpacity, ViewAlt } from "../../components/Styles";
import { AuthContext } from "../../providers/AuthProvider";
import { addPlantAlert } from "../../utils/Utils";

function SeedDetails({ route, navigation }) {
  const [data, setData] = useState(route.params.data);
  const User = useContext<any>(AuthContext);

  let key = `_${User.userData.zone.toString()}`;
  console.log(data)

  return (
    <ScrollView
      style={{ position: "relative" }}
      overScrollMode="auto"
      scrollsToTop="true"
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.addPlantButton}
        onPress={() => {
          addPlantAlert({
            data,
            navigation,
          });
        }}
      >
        <View style={styles.iconWrapper}>
          <FontAwesome5
            style={styles.addIcon}
            name="plus"
            size={16}
            color="#403D3D"
          />
          <FontAwesome5
            style={styles.plantIcon}
            name="seedling"
            size={29}
            color="#403D3D"
          />
        </View>
      </TouchableOpacity>
      <Image
        style={styles.headerImage}
        source={{
          uri: `${data.images}`,
        }}
      />
      <ViewAlt style={styles.contentWrapperContainer}>
        {data.days_to_germinate ? (
          <DetailListItem
            label="Days To Germinate"
            dataText={data.days_to_germinate + " Days"}
          />
        ) : null}
        {data.days_to_harvest ? (
          <DetailListItem
            label="To Harvest From Seed"
            dataText={`${data.days_to_harvest} Days`}
          />
        ) : null}
        {data.starter_age ? (
          <DetailListItem
            label="To Harvest From Start"
            dataText={`${
              parseInt(data.days_to_harvest) - parseInt(data.starter_age)
            } Days`}
          />
        ) : null}
        {data.non_companions ? (
          <DetailListItem
            label="Anti-Companion Plants"
            dataText={data.non_companions.join(", ")}
          />
        ) : null}
        {data.sun ? (
          <DetailListItem label="Sun Requirements" dataText={data.sun} />
        ) : null}
        {data.soil_temp_high ? (
          <DetailListItem
            label="Soil Temperature High"
            dataText={data.soil_temp_high}
          />
        ) : null}
        {data.sow_indoor !== "" ? (
          <DetailListItem label="Sowing Indoor" dataText={data.sow_indoor} />
        ) : null}
        {data.sow_outdoor !== "" ? (
          <DetailListItem label="Sowing Outdoor" dataText={data.sow_outdoor} />
        ) : null}
        {data.height ? (
          <DetailListItem label="Plant Height" dataText={data.height} />
        ) : null}
        {data.depth ? (
          <DetailListItem label="Seed Depth" dataText={data.depth} />
        ) : null}
        {data.spacing ? (
          <DetailListItem label="Seed Spacing" dataText={data.spacing} />
        ) : null}
        {data.water ? (
          <DetailListItem label="Water Requirements" dataText={data.water} />
        ) : null}
        {data.zone[key] ? (
          <DetailListItem
            label="Planting Months"
            dataText={data.zone[key].join(", ")}
          />
        ) : null}
        {data.soil_temp_low ? (
          <DetailListItem
            label="Soil Temperature Low"
            dataText={data.soil_temp_low}
          />
        ) : null}
        {data.companions ? (
          <DetailListItem
            label="Companion Plants"
            dataText={data.companions.join(", ")}
          />
        ) : null}
      </ViewAlt>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

export default SeedDetails;
