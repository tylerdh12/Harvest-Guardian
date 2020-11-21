import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { AppTabs } from './AppTabs'
import Loader from './components/LoadingScreens/Loader'
import { SafeAreaView } from './components/Styles'
import { AuthContext } from './providers/AuthProvider'
import { AuthStack } from './stacks/Auth/AuthStack'
import * as SecureStore from 'expo-secure-store'

export const Routes = ({}) => {
	const { login, userData, authBasic } = useContext(AuthContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		SecureStore.getItemAsync('authBasic')
			.then(userString => {
				if (userString) {
					login(authBasic)
				}
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return (
			<SafeAreaView>
				{Platform.OS === 'ios' ? (
					<Loader />
				) : (
					<ActivityIndicator size="large" />
				)}
			</SafeAreaView>
		)
	}

	return (
		<NavigationContainer>
			{userData ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	)
}
