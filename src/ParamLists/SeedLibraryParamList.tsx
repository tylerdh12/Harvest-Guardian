import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProductParamList } from "./DetailsParamList";

export type SeedLibraryParamList = {
  SeedLibrary: undefined;
} & ProductParamList;

export type SeedLibraryStackNavProps<T extends keyof SeedLibraryParamList> = {
  navigation: StackNavigationProp<SeedLibraryParamList, T>;
  route: RouteProp<SeedLibraryParamList, T>;
};
