export type ProductParamList = {
  Product: { data: any; type: String };
  EditProduct: { name: string; submit?: React.MutableRefObject<() => void> };
};
