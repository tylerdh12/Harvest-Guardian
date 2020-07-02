import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MyGardenParamList = {
  MyGarden: undefined;
  PlantDetails: undefined;
};

export type MyGardenStackNavProps<T extends keyof MyGardenParamList> = {
  navigation: StackNavigationProp<MyGardenParamList, T>;
  route: RouteProp<MyGardenParamList, T>;
};
