import moment from "moment";
import React, { useState } from "react";
import { Image } from "react-native";
import { CardBody, Text, ViewAlt } from "./Styles";

export const HEIGHT = 64;

export const PlantLayout = ({ item }) => {
  const [plant, setPlantData] = useState(item.seed);

  const datePlanted = (date_planted) => {
    return moment(date_planted).format("l");
  };

  function harvestProgress(date_planted, days_to_harvest) {
    const daysPlantedToNow = moment().diff(date_planted, "days");

    return (daysPlantedToNow / parseInt(days_to_harvest)) * 100 < 100
      ? (daysPlantedToNow / parseInt(days_to_harvest)) * 100
      : 100;
  }

  function harvestProgressColor(
    date_planted,
    days_to_harvest,
    days_to_germinate
  ) {
    const daysPlantedToNow = moment().diff(date_planted, "days");
    if (daysPlantedToNow <= parseInt(days_to_germinate)) {
      return "yellow";
    } else if (daysPlantedToNow <= parseInt(days_to_harvest)) {
      return "rgb(148, 224, 136)";
    } else {
      return "tomato";
    }
  }

  function dateToBeHarvested(date_planted, days_to_harvest) {
    const dateToHarvest = moment(date_planted).add(
      parseInt(days_to_harvest),
      "days"
    );
    const numberOfDays = moment().diff(dateToHarvest, "days");
    if (Math.sign(numberOfDays) == -1) {
      return moment(dateToHarvest).format("l");
    } else {
      return "Ready";
    }
  }

  return (
    <>
      <Image
        source={{
          uri: `${plant.images}`,
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
        <Text style={{ fontSize: 18, fontWeight: "600" }}>{plant.species}</Text>
        <ViewAlt
          style={{
            marginTop: 10,
            height: 10,
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: harvestProgressColor(
              item.date_planted,
              plant.days_to_harvest,
              plant.days_to_germinate
            ),
            borderRadius: 10,
            width: "100%",
          }}
        >
          <ViewAlt
            style={{
              height: 8,
              backgroundColor: harvestProgressColor(
                item.date_planted,
                plant.days_to_harvest,
                plant.days_to_germinate
              ),
              borderRadius: 10,
              width: `${harvestProgress(
                item.date_planted,
                plant.days_to_harvest
              )}%`,
              flex: 1,
            }}
          ></ViewAlt>
        </ViewAlt>
        <ViewAlt style={{ flexDirection: "row" }}>
          <ViewAlt style={{ width: "50%" }}>
            <Text
              style={{
                textAlign: "left",
                marginTop: 15,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              Date Planted
            </Text>
            <Text style={{ textAlign: "left", marginTop: 5 }}>
              {datePlanted(item.date_planted)}
            </Text>
          </ViewAlt>
          <ViewAlt style={{ width: "50%" }}>
            <Text
              style={{
                textAlign: "right",
                marginTop: 15,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              Day to Harvest
            </Text>
            <Text
              style={{
                textAlign: "right",
                marginTop: 5,
                marginBottom: 5,
                fontWeight: "500",
              }}
            >
              {dateToBeHarvested(item.date_planted, plant.days_to_harvest)}
            </Text>
          </ViewAlt>
        </ViewAlt>
      </CardBody>
    </>
  );
};
