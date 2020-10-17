import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type SettingsParamList = {
  Settings: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  ChangeZone: undefined;
  Security: undefined;
  Notifications: undefined;
  Preferences: undefined;
  Privacy: undefined;
  About: undefined;
};

export type SettingsStackNavProps<T extends keyof SettingsParamList> = {
  navigation: StackNavigationProp<SettingsParamList, T>;
  route: RouteProp<SettingsParamList, T>;
};
