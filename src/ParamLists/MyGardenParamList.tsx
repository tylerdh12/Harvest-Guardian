import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductParamList } from "./ProductParamList";

export type MyGardenParamList = {
  MyGarden: undefined;
} & ProductParamList;

export type MyGardenStackNavProps<T extends keyof MyGardenParamList> = {
  navigation: StackNavigationProp<MyGardenParamList, T>;
  route: RouteProp<MyGardenParamList, T>;
};
