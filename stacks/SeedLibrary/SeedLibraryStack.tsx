import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import theme from '../../theme'
import Create from './Create'
import SeedDetails from './Details'
import { SeedLibrary } from './SeedLibrary'

const Stack = createStackNavigator()

export const SeedLibraryStack = ({ route, navigation }) => {
	return (
		<Stack.Navigator initialRouteName="SeedLibrary">
			<Stack.Screen
				name="Seed Library"
				options={{
					headerStyle: {
						backgroundColor: 'rgb(148, 224, 136)',
					},
					headerTintColor: '#403D3D',
					headerTitleStyle: {
						fontWeight: '700',
						fontSize: 20,
					},
				}}
				component={SeedLibrary}
			/>
			<Stack.Screen
				options={({ route }: any) => ({
					headerTitle: route.params.data.species,
					headerStyle: {
						backgroundColor: theme.COLORS.PRIMARY,
					},
					headerTintColor: theme.COLORS.HEADERTINT,
					headerTitleStyle: {
						fontWeight: '700',
						fontSize: 20,
					},
				})}
				name="Details"
				component={SeedDetails}
			/>
			<Stack.Screen
				options={({ route }: any) => ({
					headerTitle: `New Seed`,
					headerStyle: {
						backgroundColor: theme.COLORS.PRIMARY,
					},
					headerTintColor: '#403D3D',
					headerTitleStyle: {
						fontWeight: '700',
						fontSize: 20,
					},
				})}
				name="Create"
				component={Create}
			/>
		</Stack.Navigator>
	)
}
