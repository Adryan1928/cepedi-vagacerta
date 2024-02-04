import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export type INavigationProps = NavigationProp<RootStackParamList>;
