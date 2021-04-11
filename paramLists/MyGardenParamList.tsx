import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { DetailsParamList } from './DetailsParamList'

export type MyGardenParamList = {
	MyGarden: undefined
	PlantDetails: undefined
} & DetailsParamList

export type MyGardenStackNavProps<T extends keyof MyGardenParamList> = {
	navigation: StackNavigationProp<MyGardenParamList, T>
	route: RouteProp<MyGardenParamList, T>
}
