import moment from "moment";
import React, { useContext, useState } from "react";
import { Button, Image } from "react-native";
import { DetailListItem } from "../../components/DetailListItem";
import { ScrollView, View, ViewAlt } from "../../components/Styles";
import { AuthContext } from "../../providers/AuthProvider";
import { deletePlantAlert } from "../../utils/Utils";

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
  const [data, setData] = useState(route.params.data);
  const User = useContext<any>(AuthContext);

  let key = "_" + User.userData.zone.toString();

  return (
    <ScrollView>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${data.seed.images}`,
        }}
      />
      <ViewAlt
        style={{
          paddingTop: 25,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: -30,
        }}
      >
        <DetailListItem label="Variety" dataText={data.seed.variety} />
        <DetailListItem
          label="Date Planted"
          dataText={moment(data.date_planted).format("l")}
        />
        <DetailListItem label="Description" dataText={data.seed.description} />
        {data.seed.days_to_germinate ? (
          <DetailListItem
            label="Days To Germinate"
            dataText={data.seed.days_to_germinate}
          />
        ) : null}
        {data.seed.days_to_harvest ? (
          <DetailListItem
            label="Days To Harvest"
            dataText={data.seed.days_to_harvest}
          />
        ) : null}
        {data.seed.zone[key] ? (
          <DetailListItem
            label="Planting Months"
            dataText={data.seed.zone[key].join(", ")}
          />
        ) : null}
        {data.seed.sow_indoor !== "" ? (
          <DetailListItem
            label="Sowing Indoor"
            dataText={data.seed.sow_indoor}
          />
        ) : null}
        {data.seed.sow_outdoor !== "" ? (
          <DetailListItem
            label="Sowing Outdoor"
            dataText={data.seed.sow_outdoor}
          />
        ) : null}
        {data.seed.sun ? (
          <DetailListItem label="Sun Requirements" dataText={data.seed.sun} />
        ) : null}
        {data.seed.soil_temp_low || data.seed.soil_temp_high ? (
          <DetailListItem
            label="Soil Temperature Range"
            dataText={
              data.seed.soil_temp_high + " - " + data.seed.soil_temp_low + " °F"
            }
          />
        ) : null}
        {data.seed.height ? (
          <DetailListItem label="Plant Height" dataText={data.seed.height} />
        ) : null}
        {data.seed.depth ? (
          <DetailListItem label="Seed Depth" dataText={data.seed.depth} />
        ) : null}
        {data.seed.spacing ? (
          <DetailListItem label="Seed Spacing" dataText={data.seed.spacing} />
        ) : null}
        {data.seed.water ? (
          <DetailListItem
            label="Water Requirements"
            dataText={data.seed.water}
          />
        ) : null}
        {data.seed.nutrient ? (
          <DetailListItem
            label="Nutrient Requirements"
            dataText={data.seed.nutrient.join(", ")}
          />
        ) : null}
        {data.seed.byproducts ? (
          <DetailListItem
            label="Byproduct"
            dataText={data.seed.byproducts.join(", ")}
          />
        ) : null}
        {data.seed.companions ? (
          <DetailListItem
            label="Companion Plants"
            dataText={data.seed.companions.join(", ")}
          />
        ) : null}
        {data.seed.non_companions ? (
          <DetailListItem
            label="Anti-Companion Plants"
            dataText={data.seed.non_companions.join(", ")}
          />
        ) : null}
        {data.seed.complete === true ? (
          <DetailListItem label="Complete Data" dataText="Yes" />
        ) : (
          <DetailListItem label="Complete Data" dataText="No" />
        )}
        {data.seed.public === true ? (
          <DetailListItem label="Public Seed" dataText="Yes" />
        ) : (
          <DetailListItem label="Public Seed" dataText="No" />
        )}
        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Button
            title="Edit"
            onPress={() => {
              navigation.navigate("EditPlantDetails", {
                data: data,
              });
            }}
          />
          <Button
            title="Delete"
            color="red"
            onPress={() => {
              deletePlantAlert({
                data,
                onRefresh: () => {
                  navigation.goBack();
                },
              });
            }}
          />
        </View>
      </ViewAlt>
    </ScrollView>
  );
}

export default Details;
