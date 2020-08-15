import React from "react";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import CardDetails from "../../components/Card/CardDetails";
import { CardImage } from "../../components/Card/CardImage";
import ProgressBar from "../../components/Card/ProgressBar";
import SpeciesTitle from "../../components/Card/SpeciesTitle";
import { CardBody, View } from "../../components/Styles";

interface CardLayoutProps {
  navigation: any;
  item: any;
}

const CardLayout: React.FunctionComponent<CardLayoutProps> = ({
  navigation,
  item,
}) => {
  return (
    <TouchableNativeFeedback
      onPress={() => {
        navigation.navigate("Details", {
          data: item,
          type: "seed",
        });
      }}
    >
      <View style={{ backgroundColor: "transparent" }}>
        <CardImage image={item.seed.images} />
        <CardBody>
          <SpeciesTitle species={item.seed.species} />
          <ProgressBar
            date_planted={item.date_planted}
            days_to_harvest={item.seed.days_to_harvest}
            days_to_germinate={item.seed.days_to_germinate}
          />
          <CardDetails
            date_planted={item.date_planted}
            days_to_harvest={item.seed.date_to_harvest}
          />
        </CardBody>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CardLayout;
