export type DetailsParamList = {
  Details: { data: any; type: String };
  EditDetails: { name: string; submit?: React.MutableRefObject<() => void> };
};
