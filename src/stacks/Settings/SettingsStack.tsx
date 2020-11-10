import { createStackNavigator } from '@react-navigation/stack'
import { default as React } from 'react'
import About from './About'
import Preferences from './Preferences'
import Privacy from './Privacy'
import Profile from './Account/Profile'
import Settings from './Settings'
import { ChangePassword } from './Account/ChangePassword'
import { ChangeZone } from './Account/ChangeZone'
import { ChangeZip } from './Account/ChangeZip'
import { AdminPanel } from './Admin/AdminPanel'
import CreateSeed from './Admin/CreateSeed'

const Stack = createStackNavigator()

export const SettingsStack = ({}) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Settings"
				component={Settings}
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
			/>
			<Stack.Screen
				name="Profile"
				component={Profile}
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
			/>
			<Stack.Screen
				name="Preferences"
				component={Preferences}
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
			/>
			<Stack.Screen
				name="Privacy"
				component={Privacy}
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
			/>
			<Stack.Screen
				name="About"
				component={About}
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
			/>
			<Stack.Screen
				name="Change Password"
				component={ChangePassword}
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
			/>
			<Stack.Screen
				name="Change Zone"
				component={ChangeZone}
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
			/>
			<Stack.Screen
				name="Change Zip Code"
				component={ChangeZip}
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
			/>
			<Stack.Screen
				name="Admin Panel"
				component={AdminPanel}
				options={{
					headerTitle: 'Admin Panel',
					headerStyle: {
						backgroundColor: 'rgb(148, 224, 136)',
					},
					headerTintColor: '#403D3D',
					headerTitleStyle: {
						fontWeight: '700',
						fontSize: 20,
					},
				}}
			/>
			<Stack.Screen
				name="Create Seed"
				component={CreateSeed}
				options={{
					headerTitle: 'Create a New Seed',
					headerStyle: {
						backgroundColor: 'rgb(148, 224, 136)',
					},
					headerTintColor: '#403D3D',
					headerTitleStyle: {
						fontWeight: '700',
						fontSize: 20,
					},
				}}
			/>
		</Stack.Navigator>
	)
}
