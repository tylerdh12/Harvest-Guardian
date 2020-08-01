import { FlatList } from "react-native-gesture-handler";
import { Text } from "./../components/Styles";

interface DetailViewProps {}

export const DetailView: any = (_props: any) => {
  <FlatList
    data={_props.data}
    renderItem={({ item }: any) => {
      return <Text>{item[0]}</Text>;
    }}
    keyExtractor={(item: any, idx) => item + idx}
  />;
};
