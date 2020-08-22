import React, { useState } from "react";
import { Button, Image } from "react-native";
import { DetailListItem } from "../../components/DetailListItem";
import { ScrollView, View, ViewAlt } from "../../components/Styles";
import theme from "../../theme";
import { AddSeedToMyGarden } from "../../utils/Utils";

// TODO Add dynamic value for zone
function SeedDetails({ route, navigation }) {
  const [data, setData] = useState(route.params.data);

  return (
    <ScrollView>
      <Image
        style={{ width: "100%", height: 300 }}
        source={{
          uri: `${data.images}`,
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
        {data.variety ? (
          <DetailListItem label="Variety" dataText={data.variety} />
        ) : null}
        {data.description ? (
          <DetailListItem label="Description" dataText={data.description} />
        ) : null}
        {data.days_to_germinate ? (
          <DetailListItem
            label="Days To Germinate"
            dataText={data.days_to_germinate}
          />
        ) : null}
        {data.days_to_harvest ? (
          <DetailListItem
            label="Days To Harvest"
            dataText={data.days_to_harvest}
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
        {data.zone._8b ? (
          <DetailListItem
            label="Planting Months"
            dataText={data.zone._8b.join(", ")}
          />
        ) : null}
        {data.nutrient ? (
          <DetailListItem
            label="Nutrient Requirements"
            dataText={data.nutrient.join(", ")}
          />
        ) : null}
        {data.soil_temp_low ? (
          <DetailListItem
            label="Soil Temperature Low"
            dataText={data.soil_temp_low}
          />
        ) : null}
        {data.byproducts ? (
          <DetailListItem
            label="Byproduct"
            dataText={data.byproducts.join(", ")}
          />
        ) : null}
        {data.companions ? (
          <DetailListItem
            label="Companion Plants"
            dataText={data.companions.join(", ")}
          />
        ) : null}
        <DetailListItem label="Images" dataText={data.images} />
        {data.complete === true ? (
          <DetailListItem label="Complete Data" dataText="Yes" />
        ) : (
          <DetailListItem label="Complete Data" dataText="No" />
        )}
        {data.public === true ? (
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
              navigation.navigate("EditSeedDetails", {
                data: data,
              });
            }}
          />
          <Button
            title="Add to Garden"
            color={theme.COLORS.PRIMARY}
            onPress={() => {
              AddSeedToMyGarden({ data, navigation });
            }}
          />
        </View>
      </ViewAlt>
    </ScrollView>
  );
}

export default SeedDetails;
